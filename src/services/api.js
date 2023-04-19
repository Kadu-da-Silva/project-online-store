export async function getCategories() {
  const handleApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await handleApi.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // const handleApiTerm = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  // const resultSearchTerm = await handleApiTerm.json();
  // const handleApiCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  // const resultSearchCategory = await handleApiCategory.json();

  // return { resultSearchTerm, resultSearchCategory };

  const handleApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const results = await handleApi.json();

  return results;
}

export async function getProductById(productId) {
  const handleApi = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const result = await handleApi.json();
  return result;
}
