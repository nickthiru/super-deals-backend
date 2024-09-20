/*
Story: Add a deal

  As a merchant
  I want to be able to add a deal
  
*********************************

Rule: Merchant must be signed-in to add a deal

  Scenario: Merchant successfully adds a deal

    Merchant signs in

      ? This is not implemented yet

    Navigates to "Add a deal" page

    Fills out an 'Add a deal' form

    Clicks 'submit' button

    Deal is saved

    Receives "Success" response


  Scenario: Merchant is not able to go to "Add a deal" page without signing-in
  

*********************************

BACKEND:

  API Gateway

    HTTP: https://merchant.superdeals.com

      POST /deals

      Parameters:

        AddProduct_FormDetails = {
          merchantId: string,
          productId: string, 
          productName: string,
          description: string,
          category: "Food & Drink" | "Bathroom" | "Jewelery" | "Sports" | "Tech" | "Auto" | "Entertainment" | "Travel"; required; The category this product falls under,
          price: number,
          stockQuantity: number,
          images: [
            url: string,
            ...
          ],
          dateAdded: Date,
        }

      Model?


  DynamoDB

    Entity

      Deal = 
        

  Lambda

    add-a-deal


FRONTEND:

  Route

    /merchant/deals/add

      Page
      
        "Add a deal" form

      Page server

        Submit form

*/
