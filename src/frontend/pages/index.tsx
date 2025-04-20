// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// import { NextPage } from 'next';
// import Footer from '../components/Footer';
// import Layout from '../components/Layout';
// import ProductList from '../components/ProductList';
// import * as S from '../styles/Home.styled';
// import { useQuery } from '@tanstack/react-query';
// import ApiGateway from '../gateways/Api.gateway';
// import Banner from '../components/Banner';
// import { CypressFields } from '../utils/Cypress';
// import { useCurrency } from '../providers/Currency.provider';







// const Home: NextPage = () => {
//   const { selectedCurrency } = useCurrency();
//   const { data: productList = [] } = useQuery({
//     queryKey: ['products', selectedCurrency],
//     queryFn: () => ApiGateway.listProducts(selectedCurrency),
//   });

//   return (
//     <Layout>
//       <S.Home data-cy={CypressFields.HomePage}>
//         <Banner />
//         <S.Container>
//           <S.Row>
//             <S.Content>
//               <S.HotProducts>
//                 <S.HotProductsTitle data-cy={CypressFields.HotProducts} id="hot-products">
//                   Hot Products
//                 </S.HotProductsTitle>
//                 <ProductList productList={productList} />
//               </S.HotProducts>
//             </S.Content>
//           </S.Row>
//         </S.Container>
//         <Footer />
//       </S.Home>
//     </Layout>
//   );
// };

// export default Home;




import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import Banner from '../components/Banner';

import * as S from '../styles/Home.styled';
import { CypressFields } from '../utils/Cypress';
import { useCurrency } from '../providers/Currency.provider';
import ApiGateway from '../gateways/Api.gateway';

const Home: NextPage = () => {
  const [visits, setVisits] = useState<number | null>(null);

  const { selectedCurrency } = useCurrency();
  const { data: productList = [] } = useQuery({
    queryKey: ['products', selectedCurrency],
    queryFn: () => ApiGateway.listProducts(selectedCurrency),
  });

  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => setVisits(data.visits))
      .catch(err => console.error('Failed to load visit count:', err));
  }, []);

  return (
    <Layout>
      <S.Home data-cy={CypressFields.HomePage}>
        <Banner />
        <S.Container>
          <S.Row>
            <S.Content>
              <S.HotProducts>
                <S.HotProductsTitle data-cy={CypressFields.HotProducts} id="hot-products">
                  Hot Products
                </S.HotProductsTitle>
                <ProductList productList={productList} />
              </S.HotProducts>
            </S.Content>
          </S.Row>
        </S.Container>

        {/* Visit Counter */}
        <div style={{ padding: '1rem', fontSize: '1.5rem' }}>
          {visits !== null && <p>Page visits: {visits}</p>}
        </div>

        <Footer />
      </S.Home>
    </Layout>
  );
};

export default Home;

