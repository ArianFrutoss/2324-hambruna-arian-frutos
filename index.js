fetch(`https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json`)
.then((response) => response.json())
.then((data) => {
   
   // 1.- Mostrar donut con mas azucar 
   
   const donutWithMoreSugar = data.items.item.reduce((previous, current) => {

      return current.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars > previous.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars ? current : previous;
   });

   console.log("El donut con mas azucar es " + donutWithMoreSugar.name);

})
.catch(function (error){

   console.log("Hubo un problema con la petición Fetch:" + error.message);
});