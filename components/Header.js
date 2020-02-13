import Link from 'next/link'

// React CSS Styling by JavaScript object
const linkStyle = {
  marginRight: 15,
  fontFamily: 'Arial',
  textDecoration: 'none'
}

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
  )
}
