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

        Body

          AddDeal_FormDetails = {
            merchantId: string,
            title: "Samsung 65 QLED 4K Smart TV - 2023 Model",
            price: 899.99,
            originalPrice: 1299.99,
            discount: 31,
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Best_Buy_Logo.svg",
            rating: 4.7,
            category: "Food & Drink" | "Bathroom" | "Jewelery" | "Sports" | "Tech" | "Auto" | "Entertainment" | "Travel"; required; The category this product falls under,
            expiration: "2024-08-30"
          }

        Responses

          200

            {}


  DynamoDB

    Entity

      Deal = {
        PK: DEAL#<DealId>,
        SK: DEAL#<DealId>,
        merchantId: string; required; ID of merchant who created the deal,
        dealId: KSUID,
        title: string; required; Title of deal,
        originalPrice: number, required; Price of deal,
        discount: number, required; Deal discount (to calculate final deal price),
        logo: string; required; S3 Bucket URL of deal's logo,
        rating: number; optional; Overall rating of deal,
        category: "Food & Drink" | "Bathroom" | "Jewelery" | "Sports" | "Tech" | "Auto" | "Entertainment" | "Travel"; required; The category this deal falls into,
        expiration: date; required; The expiration date of the deal,
      }


  Lambda

    add-a-deal


FRONTEND:

  Route

    /merchant/deals/add

      Page
      
        "Add a deal" form

      Page Server

        Submit form

*/
