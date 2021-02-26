{
   const obj = {
      name: 'jelly'
   }
   //obj.name;
   //obj['name']

   type Animal = {
      name: string;
      age: number;
      gender: 'male' | 'female'
   }

   type Name = Animal['name'] //string
   const text: Name = 'onlyString'

   type Gender = Animal['gender']; //'male' | 'female'

   type Keys = keyof Animal; // name, age, gender (union type)
   const key: Keys = 'name';

   type Person = {
      name: string;
      gender: Animal['gender'];
   }

   const person: Person = {
      name: 'jelly',
      gender: 'female'
   }
}