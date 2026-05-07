import {
  getLatestArticlesAsync,
  getCategoriesAsync,
  getAllBrandsAsync,
} from "@/lib/cms";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const [latestArticles, blogCategories, brands] = await Promise.all([
    getLatestArticlesAsync(3),
    getCategoriesAsync(),
    getAllBrandsAsync(),
  ]);

  const productBrands = brands.slice(0, 8).map((b) => ({
    name: b.name,
    slug: b.slug,
    logo: b.logo,
  }));

  return (
    <NavbarClient
      latestArticles={latestArticles}
      blogCategories={blogCategories}
      productBrands={productBrands}
    />
  );
}
