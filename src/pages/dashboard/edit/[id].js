import FormProduct from '@components/FormProducts';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '../../../services/API';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);

  async function getProduct() {
    try {
      const response = await axios.get(endPoints.products.getProduct(id));

      if (response) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  }

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);

  return notFound ? <div> Product Not Found </div> : <FormProduct product={product} />;
}
