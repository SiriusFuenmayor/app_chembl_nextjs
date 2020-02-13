import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import NivoHeatMap from '../components/NivoHeatMap';

/* In the following I am going to fetch the ChEMBL API for the pChEMBL 
 * values measuring the activity of the interaction of several target-
 * molecule pairs.
 * 
 * With the purposse of fetching external APIs the Next.js framwework
 * implements a especial function called "getInitialProps":
 *  
 * "In practice, we usually need to fetch data from a remote data source. 
 * Next.js comes with a standard API to fetch data for pages. We do it 
 * using an async function called getInitialProps."
 * 
 * "With getInitialProps, we can fetch data for a given page via a remote 
 * data source and pass it as props to our page. getInitialProps needs to 
 * work on both server and client; since it is called in both environments."
 * 
 * First of all we need to install isomorphic-unfetch. That's the library 
 * I am going to use to fetch data. It's a simple implementation of the 
 * browser fetch API, but works both in client and server environments.
 * 
 * npm install --save isomorphic-unfetch
 * 
 * Note that in pure React usually one works with single page applications
 * and there is only a principal component generaly called 'App' inside 
 * which one will use all the other components. In contrast Next.js comes
 * with the option to create several pages in the application.
 * Every page in the Next.js framework is implemented trough a 'default
 * component' with the same name as the page, in this case is called
 * 'Index' (see https: *nextjs.org/learn/basics/getting-started for
 * explanation about default components).
 * 
 * The Index component will get an array resulting from the fetching and
 * averaging of all the pChEMBL values of every molecule-target interaction
 * (see function getInitialProps() bellow) the array wil be passed to the 
 * Index() as a 'props' object, Index will then pass this object to the
 * Heatmap() component to render the Heatmap.  
*/

// React CSS Styling by JavaScript object
const HeatMapDivStyle = {
  height: 600,
  marginRight: 15,
  marginBottom: 100
}

export default function Index(props) {

  return (
    <Layout>
      <h1>Activity Heatmap</h1>
      <div style={HeatMapDivStyle}>
        <p> The following Heatmap displays the average pchembl_value for the given target-molecule pair. Hover the mouse on any cell of the heatmap to see the corresponding value. </p>
        {/* The data of the Heatmap is stored in the props object by the */}
        {/* getInitialProps method after the API is fetch (see bellow).  */}
        {<NivoHeatMap heatMapData={props}/>}
      </div>

      <style jsx>{`
      p, h1 {
        marginTop: 20;
        font-family: 'Arial';
      }
      `}</style> 

    </Layout>
  )
};

/*** Fetching starts here ***/ 
Index.getInitialProps = async function() {

  // First I will create arrays for the targets and molecules
  var targets = ["CHEMBL325","CHEMBL1937","CHEMBL1829","CHEMBL3524","CHEMBL2563","CHEMBL1865","CHEMBL2716","CHEMBL3192","CHEMBL4145","CHEMBL5103","CHEMBL3310"];

  var molecules = ["CHEMBL98","CHEMBL99","CHEMBL27759","CHEMBL2018302","CHEMBL483254","CHEMBL1213490","CHEMBL356769","CHEMBL272980","CHEMBL430060","CHEMBL1173445","CHEMBL356066","CHEMBL1914702"];

  // Then I create an object that will hold all the data for 
  // the heatmap
  var heatMapData = {};

  heatMapData.legend = 'Average pchembl_value'

  // and I add a new property to the heatMapData object for
  // reflecting the targets in the y axis
  heatMapData.y_legend = targets
  heatMapData.x_legend = molecules

  // and the molecules in the x acis
  heatMapData.keys = [
    'CHEMBL98_avg_pchembl_value',     
    'CHEMBL99_avg_pchembl_value',
    'CHEMBL27759_avg_pchembl_value',  
    'CHEMBL2018302_avg_pchembl_value',
    'CHEMBL483254_avg_pchembl_value', 
    'CHEMBL1213490_avg_pchembl_value',
    'CHEMBL356769_avg_pchembl_value', 
    'CHEMBL272980_avg_pchembl_value',
    'CHEMBL430060_avg_pchembl_value', 
    'CHEMBL1173445_avg_pchembl_value',
    'CHEMBL356066_avg_pchembl_value', 
    'CHEMBL1914702_avg_pchembl_value'
  ]

  // another property in the heatMapData object will hold the 
  // data points for the heatmap
  heatMapData.DataPoints = [];

  // then for every pair of target molecule combination
  for (var target of targets) {

    // I create a new object to represent a data row and add 
    // as is first propierty the current target
    var DataRow = {
      target_id: target
    };

    for (var molecule of molecules) {
      
      // I first query the API to get the total amount of activity objects or entries for the
      //  given pair of target and molecule, since normally the chEMBL API only provide results 
      // by parts. Only results with non null pchembl_values are recovered as requested.
      var myURL = 'https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=' + target + '&molecule_chembl_id=' + molecule + '&pchembl_value__isnull=false';
      const res1 = await fetch(myURL);
      // The json() method of the Body mixin takes a Response stream and reads it to completion. 
      // It returns a promise that resolves with the result of parsing the body text as JSON.
      // So now I have a JavaScript object stored in data1 as the result of the JSON parsing
      const data1 = await res1.json();

      // The total number of entries is taken from the page_meta object inside the data1 object 
      // and then stored in the activity_entries variable
      var activity_entries = data1.page_meta.total_count;
      //console.log(`Number of activity entries: ${activity_entries}`); //DEBUG

      // I then use the activity_entries variable to get all the activity objects for the 
      // current target molecule pair. Only results with non null pchembl_values are 
      // recovered as requested. 
      var myURL = 'https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=' + target + '&molecule_chembl_id=' + molecule + '&pchembl_value__isnull=false&limit=' + activity_entries
      console.log(`Fetching: ${myURL}`); //DEBUG

      const res2 = await fetch(myURL);
      // The recovered list of activity objects are saved in the data2 object 
      const data2 = await res2.json();
      //console.log(data2); //DEBUG

      // Now I can calculate the average pchembl_value from all the entries  
      // of acitivity of the target molecule pair, I would also calculate 
      // the max pchembl_value       
      var pchembl_value_sum = 0;
      var total_pchembl_values = 0;
      var max_pchembl_value = 0;
      var min_pchembl_value = 10000000000;
      console.log(`Calculating average pchembl_value`); //DEBUG     
      for (var activity of data2.activities) {
        //console.log(`pchembl_value: ${activity.pchembl_value}`) // DEBUG
        pchembl_value_sum += parseFloat(activity.pchembl_value);
        total_pchembl_values++;

        if (parseFloat(activity.pchembl_value) > max_pchembl_value) {
          max_pchembl_value = parseFloat(activity.pchembl_value);
        }

        if (parseFloat(activity.pchembl_value) < min_pchembl_value) {
          min_pchembl_value = parseFloat(activity.pchembl_value);
        }

      }
      var avg_pchembl_value = pchembl_value_sum / total_pchembl_values;
      
      //console.log(`pchembl_value_sum: ${pchembl_value_sum}`) // DEBUG
      //console.log(`total_pchembl_values: ${total_pchembl_values}`) // DEBUG
      console.log(`The avg_pchembl_value for the target ${target} and molecule ${molecule} is: ${avg_pchembl_value}`) // DEBUG

      // the avg_pchembl_values are saved in an object array to be used
      // as data feed to the HeatMap component
    
      // I then add the current molecule and its associated avg_pchembl_value
      // as new properties 
      var newpropierty_name = molecule + '_avg_pchembl_value';
      DataRow[newpropierty_name] =  parseFloat(avg_pchembl_value.toFixed(2));
      // I also add a color corresponding to the avg_pchembl_value
      var newpropierty_name = newpropierty_name + 'Color';
      if (isNaN(avg_pchembl_value)) {
        DataRow[newpropierty_name] = 'hsl(0, 70%, 50%)';       
      } else {
        DataRow[newpropierty_name] = 'hsl(' + Math.floor((avg_pchembl_value/max_pchembl_value)*360) + ', 70%, 50%)';
      }
    }

    console.log('New data row:') // DEBUG
    console.log(DataRow) // DEBUG
    heatMapData.DataPoints.push(DataRow);

  }

  console.log(heatMapData) // DEBUG

  // Due to the logic of Next.js I do not have to save the data to  
  // a JSON file to build the heamap since it will be pased as props
  // to the Index component above, but if its needed to save the 
  // retrieved data as a JSON it could be done with the following
  // command:
  
  //var datastring = JSON.stringify(heatMapData.DataPoints);

  return heatMapData
};
