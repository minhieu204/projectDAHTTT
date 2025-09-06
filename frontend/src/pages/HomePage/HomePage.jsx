import { Box, Container } from '@mui/material'
import Banner from '../../components/Banner/Banner'
import Header from '../../components/Header/Header'

function HomePage() {
  const bannerData = [
    { imageUrl: 'https://cdn.pnj.io/images/promo/265/22-ngaydoi99-1972x640KPN.jpg', altText: 'Banner 1' },
    { imageUrl: 'https://cdn.pnj.io/images/promo/240/egift-t3-25-1972x640CTA.jpg', altText: 'Banner 2' },
    { imageUrl: 'https://cdn.pnj.io/images/promo/264/PNJ_fast_2025-_banner-1972x640-CTA.png', altText: 'Banner 3' },
  ]
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
      <Header />
      <Banner banners={bannerData} />
      <Container >
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quam atque omnis inventore hic. Quod, nesciunt. Atque ipsum omnis quos a consequuntur quasi, aliquid magnam. Veritatis quod unde magni sunt!
        Voluptatibus repellat recusandae, quasi sit neque expedita harum omnis deleniti ipsum quo suscipit commodi velit, enim minima laboriosam quidem facere maxime unde reprehenderit odit excepturi voluptatem. Et omnis dolor possimus.
        Rerum id minus unde esse recusandae corporis quae cum eos enim molestiae harum quidem pariatur nulla sit quia ad mollitia qui inventore saepe veniam in, asperiores nostrum. Expedita, deserunt voluptates.
        Nobis possimus asperiores harum exercitationem, culpa illum. Est laboriosam minus ab ipsam voluptatem eveniet incidunt laborum perspiciatis iusto illo saepe natus consectetur libero facilis optio hic debitis, ipsa atque dolorem?
        Laudantium eaque perspiciatis tenetur quaerat excepturi nam sit facere dignissimos impedit a, accusantium quas debitis quis exercitationem maiores? Magni aspernatur suscipit atque pariatur? Aspernatur assumenda enim consectetur! Totam, eaque cum.
        Nostrum laboriosam dignissimos unde earum! Hic officia quisquam asperiores dicta dolor impedit. Quae quasi quis ex consequatur minima accusamus maxime natus error perspiciatis, eius velit! Molestias, eveniet aliquid. Non, eos.</h1>
      </Container>
    </Box>
  )
}

export default HomePage
