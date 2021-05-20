let fetch = require("node-fetch");

const apiKey = "?key=3ef36135e7fda4370a11fd6191fef2af";
const imgurl = "https://cdn.rebrickable.com/media/sets/"



const getMinifigs = async (minifigId) => {
    let result = await fetch(
      `https://rebrickable.com/api/v3/lego/minifigs/${minifigId}/sets/${apiKey}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let response = await result.json();
    return response.results[0].set_img_url;
  };
  let stringetje ="";

const ids = ["fig-000001", "fig-000002"/*, "fig-000003", "fig-000004", "fig-000005", "fig-000006", "fig-000007", "fig-000008", "fig-000009", "fig-000010"*/];
const minifigsets =[] 
ids.forEach((id)=>{
    getMinifigs(id).then((result)=> {
        
        stringetje+= result.toString() + ",";
        console.log(stringetje);

})


        
   .then( ()=> {
        let array = stringetje.split(",")
        array.pop();
        console.log(`array is: ${array}`);
        if(minifigsets.length === 0 ){
            minifigsets.push(array)
        }
        console.log(`minifigsets is: ${minifigsets}`);
        console.log(`ids zijn: ${ids}`);

    })
})
;

