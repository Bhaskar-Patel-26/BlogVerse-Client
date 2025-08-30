import Header from '../components/Header'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default HomePage
