fetch(`https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json`)
.then((response) => response.json())
.then((data) => {
   
   // 1.- Mostrar donut con mas azucar
   console.log("1.- Mostrar donut con mas azucar");

   const donutWithMoreSugar = data.items.item.reduce((previous, current) => {
      
      return parseFloat(current.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars) > parseFloat(previous.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars) ? current : previous;
   })

   const donutsWithMoreSugar = data.items.item.filter(donut => 

      parseFloat(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars) === parseFloat(donutWithMoreSugar.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
   )

   console.log("Los donuts con mas azucar son: ");
   printDonuts(donutsWithMoreSugar);
   
   // 2.- Mostrar donut con mas hierro
   console.log();
   console.log("2.- Mostrar donut con mas hierro");

   const donutWithMoreIron = data.items.item.reduce((previous, current) => {
      
      for (let i = 0; i < current.nutrition_facts.nutrition.vitamines.length; i++){

         if (current.nutrition_facts.nutrition.vitamines[i].type === "Iron"){
            
            return parseFloat(current.nutrition_facts.nutrition.vitamines[i].percent) > parseFloat(previous.nutrition_facts.nutrition.vitamines[i].percent) ? current : previous;
         }
      }
   })

   console.log("Los donuts con mas hierro son: ");
   console.log(donutWithMoreIron.name);
   
   // 3.- Mostrar donut con mas proteina
   console.log();
   console.log("3.- Mostrar donut con mas proteina");

   const donutWithMoreProtein = data.items.item.reduce((previous, current) => {
      
      return parseFloat(current.nutrition_facts.nutrition.proteine) > parseFloat(previous.nutrition_facts.nutrition.proteine) ? current : previous;
   })

   const donutsWithMoreProtein = data.items.item.filter(donut => 

      parseFloat(donut.nutrition_facts.nutrition.proteine) === parseFloat(donutWithMoreProtein.nutrition_facts.nutrition.proteine)
   )
   
   console.log("Los donuts con mas proteinas son: ");
   printDonuts(donutsWithMoreProtein);

   // 4.- Mostrar donut con menos fibra
   console.log();
   console.log("4.- Mostrar donut con menos fibra");

   const donutWithLessFibre = data.items.item.reduce((previous, current) => {
      
      return parseFloat(current.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre) < parseFloat(previous.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre) ? current : previous;
   })

   const donutsWithLessFibre = data.items.item.filter(donut => 

      parseFloat(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre) === parseFloat(donutWithLessFibre.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)
   )
   
   console.log("Los donuts con menos fibra son: ");
   printDonuts(donutsWithLessFibre);

   function printDonuts(donuts){

      for (let i = 0; i < donuts.length; i++){

         console.log(donuts[i].name);
      }
   }
   
   // 5.- Mostrar todos los donuts y sus calorias
   console.log();
   console.log("5.- Mostrar todos los donuts y sus calorias");

   data.items.item.map(donuts => {

      console.log("El donut " + donuts.name + " tiene " + donuts.nutrition_facts.nutrition.calories + " calorias");
   })

   // 6.- Mostrar todos los donuts y sus carbohidratos
   console.log();
   console.log("6.- Mostrar todos los donuts y sus carbohidratos");

   data.items.item.map(donuts => {

      console.log("El donut " + donuts.name + " tiene " + donuts.nutrition_facts.nutrition.carbohydrate.daily_value + " carbohidratos");
   })

   // 7.- Mostrar la media de calorias de todos los donuts
   console.log();
   console.log("7.- Mostrar la media de calorias de todos los donuts");

   let calories = 0;
   let cont = 0;
   
   data.items.item.map(donuts => {

      calories += donuts.nutrition_facts.nutrition.calories;
      cont++;
   })

   const calorieMedia = calories / cont;

   console.log("La media de calorias de todos los donuts es " + calorieMedia);

   // 8.- Mostrar la suma de grasas saturadas de todos los donuts
   console.log();
   console.log("8.- Mostrar la suma de grasas saturadas de todos los donuts");

   let saturated = 0;
   
   data.items.item.map(donuts => {

      saturated += parseFloat(donuts.nutrition_facts.nutrition.fat.fat_type.saturated);
   })

   console.log("La suma de grasas saturadas de todos los donuts es " + saturated + "g");

   // 9.- Mostrar el porcentaje medio de cada vitamina
   console.log();
   console.log("9.- Mostrar el porcentaje medio de cada vitamina");

   const vitaminesNames = [];
   const vitaminesPercent = [];

   data.items.item.map(donuts => {

      for (let i = 0; i < donuts.nutrition_facts.nutrition.vitamines.length; i++){

         if (vitaminesPercent[i] === undefined){
            
            vitaminesPercent[i] = 0;
         }

         vitaminesNames[i] = donuts.nutrition_facts.nutrition.vitamines[i].type;
         vitaminesPercent[i] += parseFloat(donuts.nutrition_facts.nutrition.vitamines[i].percent);
      }
   })

   for (let i = 0; i < vitaminesPercent.length; i++){

      const vitaminesPercentMedia = vitaminesPercent[i] / vitaminesPercent.length;

      console.log("La media de " + vitaminesNames[i] + " es " + vitaminesPercentMedia + "%");
   }
})
.catch(function (error){

   console.log("Hubo un problema con la petición Fetch:" + error.message);
})