import Categories from "../components/api/category/Categories";

const CategoriesPage = () => {

  return (
    <div className="w-full max-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-10">
      <Categories />
    </div>
  );
};

export default CategoriesPage;
