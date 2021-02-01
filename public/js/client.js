const letterEndpoint = '/letter/new';

const postFormData = async ({ letterEndpoint, formData }) => {

  //Prepare JSON object to send to the server
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  // return if name or wish are empty or if wish is more than 100 characters
  if(!plainFormData.userId && 
     !plainFormData.wish || plainFormData.wish.length > 100) return;
  
  let response = await fetch(`http://localhost:3000${letterEndpoint}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: formDataJsonString
  });
  
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg);
  }

  const responseData = await response.json();

  switch (responseData.statusMsg){
   case "Failed":
     location.assign('/letter/failure');
     break;
   case "Success":
     location.assign('/letter/success');
   }

  return responseData;
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try{
    const formData = new FormData(e.currentTarget)

    const responseData = await postFormData({ letterEndpoint, formData })
    console.log({ responseData });
  }catch(e){
    console.log(e);
  }

 
};

// get and listen for the form to be submitted and add a new dream when it is
const santaForm = document.getElementById('letterForm')
santaForm.addEventListener("submit", handleFormSubmit);
