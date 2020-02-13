import Layout from '../components/Layout.js'

const paragraphStyle = {
  marginTop: 50,
  fontFamily: "Arial"
}

export default function About() {
  return (
    <Layout>
      <p style={paragraphStyle}> Assignment for the European Molecular Biology Laboratory showing the fetching, processing and display of data in the ChEMBL API using the Next.js Framework and the Nivo Data Vizualization library. Made by Sirius Fuenmayor.</p>
    </Layout>
  )
}
