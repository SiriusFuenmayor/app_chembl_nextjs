import Header from './Header'

// React CSS Styling by JavaScript object
const layoutStyle = {
  margin: 20,
  padding: 20
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  )
}
