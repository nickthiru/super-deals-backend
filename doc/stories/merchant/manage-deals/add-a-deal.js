/*
Story: Add a deal

  As a merchant
  I want to be able to add a deal

*********************************

Rule: Merchant must be signed-in to add a deal

  Scenario: Merchant successfully adds a deal

    Merchant signs in

    Navigates to "Add a deal" page

    Fills out an 'Add a deal' form

    Clicks 'submit' button

    Deal is saved

    Receives "Success" response


  Scenario: Merchant is not able to go to "Add a deal" page without signing-in
  


*********************************

DATA:

  AddProductFormDetails = {
    merchantId: string,
    merchantName: string,
    productId: string, 
    productName: string,
    description: string,
    category: "fashion" | "pharmacy" | "appliances",
    price: number,
    stockQuantity: number,
    images: [
      url: string,
      ...
    ],
    dateAdded: Date
  }

  {
    "Id": 123,
    "Title": "Bicycle 123",
    "Description": "123 description",
    "BicycleType": "Hybrid",
    "Brand": "Brand-Company C",
    "Price": 500,
    "Color": ["Red", "Black"],
    "ProductCategory": "Bicycle",
    "InStock": true,
    "QuantityOnHand": null,
    "RelatedItems": [
        341,
        472,
        649
    ],
    "Pictures": {
        "FrontView": "http://example.com/products/123_front.jpg",
        "RearView": "http://example.com/products/123_rear.jpg",
        "SideView": "http://example.com/products/123_left_side.jpg"
    },
    "ProductReviews": {
      "FiveStar": [
          "Excellent! Can't recommend it highly enough! Buy it!",
          "Do yourself a favor and buy this."
      ],
      "OneStar": [
          "Terrible product! Do not buy this."
      ]
    },
    "Comment": "This product sells out quickly during the summer",
    "Safety.Warning": "Always wear a helmet"
  }


BACKEND:

  API

    HTTP: https://merchant.superdeals.com

      POST /deals

      Parameters: AddProductFormDetails

      Model:


  DDB

    Entity

      Merchant = {
        PK: MERCHANT#<MerchantId>
        SK: MERCHANT#<MerchantId>
        ID: string, required, ID of moderator
        Name: string, required, Name of moderator
      }
        

      Deal


  Lambda


FRONTEND:

  Route

    /merchant/deals/add

      Page
      
        "Add a deal" form

      Page server

        Submit form

*/