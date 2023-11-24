
Pricing Module v2
Objective
Design and build a web application with a configurable pricing module that supports differential pricing. The application utilizes the Django Admin for the user interface.

Description
The Pricing Module manages product/service prices and calculates the final invoice amount based on factors such as time, distance traveled, and configurable pricing tiers. The system is inspired by the billing logic of ride-sharing services like Uber or Ola.

Store:

The database model is designed to store pricing configurations, allowing for flexibility and multiple configurations to be stored concurrently. Business Development teams can enable/disable specific configurations. The pricing is configured based on the following parameters:

Distance Base Price (DBP): Varies depending on the day of the week and the distance traveled.

Distance Additional Price (DAP): Additional cost per kilometer after a certain distance.

Time Multiplier Factor (TMF): Multiplier for time duration, with different tiers.

Waiting Charges (WC): Additional charges for waiting time after an initial period.

Interface:

A custom form is provided for adding, modifying, and removing pricing configurations. The form includes proper validations, and changes to the configuration are logged with the user and timestamp.

Evaluation:

The application exposes an API to calculate pricing using the formula:

Price=(DBP+(Dn∗DAP))+(Tn∗TMF)+WC

Where:

D represents additional distance traveled.

Tn is the time duration.
Usage
The application can be accessed at Applink.

Build Instructions
To set up the project locally, follow these instructions:

Clone the GitHub repository.

bash
Copy code
git clone https://github.com/your-username/your-repo.git
Navigate to the project directory.

bash
Copy code
cd your-repo
Install dependencies.

bash
Copy code
npm install  # or yarn install
Start the development server.
