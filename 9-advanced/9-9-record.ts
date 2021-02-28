{
   type PageInfo = {
      title: string;
   }
   type Page = 'home' | 'about' | 'contact';

   const nav: Record<Page, PageInfo> = {
      //Page - key, PageInfo - value
      home: { title: 'Home' },
      about: { title: 'About' },
      contact: { title: 'Contact' },
   };

   type Product = 'cat' | 'dog';
   type NewProduct = Capitalize<Product>; // 'Cat' | 'Dog'
}