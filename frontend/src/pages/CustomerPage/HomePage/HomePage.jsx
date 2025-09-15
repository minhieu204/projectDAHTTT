import { Box, Container } from '@mui/material'
import Banner from '~/components/customer/Banner/Banner'
import Service from '~/components/customer/Service/Service'
import ProductHome from '~/components/customer/ProductHome/ProductHome'

function HomePage() {
  const bannerData = [
    { imageUrl: 'https://cdn.pnj.io/images/promo/265/22-ngaydoi99-1972x640KPN.jpg', altText: 'Banner 1' },
    { imageUrl: 'https://cdn.pnj.io/images/promo/240/egift-t3-25-1972x640CTA.jpg', altText: 'Banner 2' },
    { imageUrl: 'https://cdn.pnj.io/images/promo/264/PNJ_fast_2025-_banner-1972x640-CTA.png', altText: 'Banner 3' },
  ]
  return (
    <>
      <Banner banners={bannerData} />
      <Container sx={{ mt: 3 }}>
        <Service />
        <ProductHome />
        <Box>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab mollitia temporibus veniam magnam voluptatibus tempore ex possimus itaque officia commodi obcaecati at perferendis, doloribus quisquam voluptatem placeat aut cum iure?
          Porro illo molestias molestiae necessitatibus. Enim aliquam, aliquid beatae eaque reprehenderit ratione voluptates placeat fugit, temporibus cupiditate quam natus ea iure ipsa unde iste neque adipisci ipsam autem quis odio!
          Repudiandae laboriosam velit dicta ex, tenetur, maiores quaerat aspernatur beatae nisi obcaecati nemo sapiente facere quibusdam cumque quis esse, porro assumenda? Nisi, fugit beatae nesciunt minima explicabo repudiandae commodi officia!
          Id maxime assumenda voluptatum alias natus tempora porro atque quod dolores a accusantium quaerat laborum sunt sed totam, nulla laboriosam velit adipisci quia esse! Sed dolorem omnis incidunt error aperiam?
        </Box>
      </Container>
    </>
  )
}

export default HomePage
