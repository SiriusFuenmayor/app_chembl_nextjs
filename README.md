Sample application for fetching the EMBL ChEMBL API
===================================================

Sample application showing the fetching, processing and visualisation of data from the ChEMBL API of the European Molecular Biology Laboratory (https://www.ebi.ac.uk/chembl/).

Fetching and processing large parts of APIs on the client side using javascript frameworks such as React can be time consuming and will result in a poor experience to the user so this application was made using the Next.js framework (https://nextjs.org/) due to its ability of extending the React framework with features such as Server Side Rendering. With Server Side Rendering the web page is pre rendered on the server and any fetching, data processing and page rendering is done server side.

For data visualisation the Nivo React library (https://nivo.rocks/) was selected which contains React components for different types of plots and graphs.

This application will fetch all the URLs in the ChEMBL API relating the activity of a given molecule over a given target for targets and molecules of the following list:

List of targets:
CHEMBL325
CHEMBL1937
CHEMBL1829
CHEMBL3524
CHEMBL2563
CHEMBL1865
CHEMBL2716
CHEMBL3192
CHEMBL4145
CHEMBL5103
CHEMBL3310

List of molecules:
CHEMBL98
CHEMBL99
CHEMBL27759
CHEMBL2018302
CHEMBL483254
CHEMBL1213490
CHEMBL356769
CHEMBL272980
CHEMBL430060
CHEMBL1173445
CHEMBL356066
CHEMBL1914702

URLs in the ChEMBL API showing the activity of molecules over targets have the following syntax:

https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=TARGET&molecule_chembl_id=MOLECULE&pchembl_value__isnull=false

for every pair of target and molecule selected the above URL will show a list of "activity" objects each containing activity data of the selected molecule over the selected target for a given assay. The pchembl_value's of every activity object will be extracted and its average will be computed to construct a Heatmap plot. The filter "pchembl_value__isnull=false" excludes results where pchembl_value is null.

** Please look at the index.js file inside the pages folder which is fully commented showing the details of the data fetching and processing **

Fetching and processing all the data could take time depending on your computer so messages will be output to the server console showing the status of the fetching process.

Installation
------------

You will need the last version of Node.js and the Yarn package manager installed on your system.

Then from a command line or terminal do the following:

	git clone https://github.com/SiriusFuenmayor/app_chembl_nextjs.git
	cd app_embl
	npm install
	npm run dev

it will start the development mode and the web page will be available on 

	http://localhost:3000

For building a production app stop the server and do the following 

	npm run build
	npm run start

the web page will be available on 

	http://localhost:3000

**Detailed information on deploying a Next.js app could be found at https://nextjs.org/learn/basics/deploying-a-nextjs-app**


