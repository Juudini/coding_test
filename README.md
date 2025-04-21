![Typing SVG](https://readme-typing-svg.demolab.com?demo/?color=D323F7&lines=ZSSN+-+CODING+TEST;ZOMBIE+SOCIAL+NETWORK+TEST;by+Juan+Debandi)

#### This project is a ZSSN CODING TEST

![Ing Progress](https://img.shields.io/badge/Status-In%20Progress-yellow)

  <summary><h2>🧩 Languages & Tools</h2></summary>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=typescript,nodejs,express,postgresql,postman,prisma&perline=9" />
  </a>
</p>

## Project Structure

- `/src`
  - `/config`: Contains configuration files for the application, such as environment variables and database settings.
  - `/controllers`: Manages the application's control flow, processing user input and interacting with models and views.
  - `/dtos`: Defines Data Transfer Objects used for communication between different layers of the application.
  - `/routes`: Defines the application's routing logic, mapping URLs to specific controllers and actions.
  - `/shared`: Includes shared utilities, constants, and helper functions used across the application.
  - `/types`: Contains TypeScript type definitions and interfaces for ensuring type safety.
  - `/use-cases`: Implements the core business logic and application-specific use cases.

## Installation and Configuration

Follow the steps below to set up and run the application in your local environment:

1. Clone this repository to your local machine:

```
git clone https://github.com/Juudini/coding_test.git
```

2. Navigate to the project directory:

```
cd coding_test
```

3. Install project dependencies:

```
npm i
```

4. Migrate to initial schema to the database:

```
npx prisma migrate dev
```

5. Launch server:

```
npm run dev
```

Make sure you have the `.env` file in the root folder.

## API Endpoints

Here is the documentation for the backend API endpoints:

### 1. `GET /api/survivors`

Fetches a list of all survivors.

- **Response:**
  ```json
  {
    "message": "Survivors retrieved successfully.",
    "payload": {
      "survivors": [
        {
          "id": "5962851e-d763-4d5c-8d5d-cc7713b7cfd0",
          "name": "Gina Drake",
          "age": 18,
          "gender": "female",
          "lastLatitude": "34.0000",
          "lastLongitude": "-118.0000",
          "isInfected": true,
          "inventoryId": "1e1aab04-83da-4ab1-ba11-9df73489f076",
          "inventory": {
            "id": "1e1aab04-83da-4ab1-ba11-9df73489f076",
            "items": [
              {
                "id": "90e22db6-0fd1-4d48-9281-bd4d9c9bf7d0",
                "type": "WATER",
                "quantity": 3,
                "inventoryId": "1e1aab04-83da-4ab1-ba11-9df73489f076"
              },
              {
                "id": "a7afb58d-f0f9-48fd-8d34-3e75982df2e1",
                "type": "FOOD",
                "quantity": 2,
                "inventoryId": "1e1aab04-83da-4ab1-ba11-9df73489f076"
              },
              {
                "id": "891763c6-dc9c-4b42-a96e-882f698e01b3",
                "type": "AMMUNITION",
                "quantity": 10,
                "inventoryId": "1e1aab04-83da-4ab1-ba11-9df73489f076"
              },
              {
                "id": "2409a15a-a526-4592-b79a-dccfaa37c3d8",
                "type": "MEDICATION",
                "quantity": 1,
                "inventoryId": "1e1aab04-83da-4ab1-ba11-9df73489f076"
              }
            ]
          },
          "Report": [
            {
              "id": "912953ab-f055-4c37-87b9-d5e05a962c7f"
            }
          ],
          "reportCount": 1
        },
        ...
      ]
    }
  }
  ```

### 2. `POST /api/survivors`

Creates a new survivor.

- **Body:**
  ```json
  {
    "name": "Nathan Drake",
    "age": 18,
    "gender": "female",
    "lastLatitude": "34.1078",
    "lastLongitude": "-118.2807",
    "inventory": [
      {
        "type": "WATER",
        "quantity": 3
      },
      {
        "type": "FOOD",
        "quantity": 2
      },
      {
        "type": "AMMUNITION",
        "quantity": 10
      },
      {
        "type": "MEDICATION",
        "quantity": 1
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Survivor created successfully.",
    "payload": {
      "survivor": {
        "id": "e13e9cff-6076-4a6a-bc79-fa7ef474d8ce",
        "name": "Nathan Drake",
        "age": 18,
        "gender": "female",
        "lastLatitude": "34.1078",
        "lastLongitude": "-118.2807",
        "isInfected": false,
        "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784",
        "inventory": {
          "id": "a11750ad-adb8-4ea1-8531-48fd5f85f784",
          "items": [
            {
              "id": "9cceb77a-feca-41f1-b65f-23259b986f99",
              "type": "WATER",
              "quantity": 3,
              "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784"
            },
            {
              "id": "cf3b2dd1-911d-4aa2-a404-1a6a38434d4f",
              "type": "FOOD",
              "quantity": 2,
              "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784"
            },
            {
              "id": "75a8b18e-9449-4451-b459-6e9fb8b5cc26",
              "type": "AMMUNITION",
              "quantity": 10,
              "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784"
            },
            {
              "id": "5186ad59-23ee-46ae-9365-16311e43c3a1",
              "type": "MEDICATION",
              "quantity": 1,
              "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784"
            }
          ]
        }
      }
    }
  }
  ```

### 3. `PATCH /api/survivors/location/:survivorId`

Updates the location of an existing survivor.

- Params:
  survivorId: The ID of the survivor whose location will be updated.

- **Body:**
  ```json
  {
    "lastLatitude": "00.8000",
    "lastLongitude": "-200.0000"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Location updated successfully.",
    "payload": {
      "survivor": {
        "id": "e13e9cff-6076-4a6a-bc79-fa7ef474d8ce",
        "name": "Nathan Drake",
        "age": 18,
        "gender": "female",
        "lastLatitude": "00.8000",
        "lastLongitude": "-200.0000",
        "isInfected": false,
        "inventoryId": "a11750ad-adb8-4ea1-8531-48fd5f85f784"
      }
    }
  }
  ```

### 4. `GET /api/stats/infected`

Fetches the percentage of infected survivors.

- **Response:**
  ```json
  {
    "message": "Infection percentage calculated successfully",
    "payload": {
      "percentage": 43.75,
      "infectedCount": 7,
      "totalSurvivors": 16
    }
  }
  ```

### 5. `GET /api/stats/healthy`

Fetches the percentage of healthy survivors.

- **Response:**
  ```json
  {
    "message": "Non infection percentage calculated successfully",
    "payload": {
      "percentage": 56.25,
      "nonInfectedCount": 9,
      "totalSurvivors": 16
    }
  }
  ```

### 6. `GET /api/stats/resources`

Fetches average resources

- **Response:**
  ```json
  {
    "message": "Average resources calculated successfully",
    "payload": {
      "averages": {
        "water": 2,
        "food": 7.22,
        "medication": 1.56,
        "ammunition": 2.11
      },
      "totalSurvivors": 9,
      "resourcesCount": {
        "water": 18,
        "food": 65,
        "medication": 14,
        "ammunition": 19
      }
    }
  }
  ```

### 7. `GET /api/stats/points-lost`

Fetches Lost points

- **Response:**
  ```json
  {
    "message": "Lost points calculated successfully",
    "payload": {
      "totalLostPoints": 180,
      "infectedSurvivorsCount": 7,
      "itemsDetail": {
        "water": {
          "quantity": 18,
          "points": 72
        },
        "food": {
          "quantity": 14,
          "points": 42
        },
        "medication": {
          "quantity": 10,
          "points": 20
        },
        "ammunition": {
          "quantity": 46,
          "points": 46
        }
      },
      "pointsByItem": {
        "water": 72,
        "food": 42,
        "medication": 20,
        "ammunition": 46
      },
      "pointsSystem": {
        "water": 4,
        "food": 3,
        "medication": 2,
        "ammunition": 1
      },
      "calculationDate": "2025-04-21T02:39:20.000Z"
    }
  }
  ```

### 8. `POST /api/:survivorId`

- Params:
  survivorId: The ID of the survivor to report.

- **Response:**
  ```json
  {
    "message": "Infection reported successfully",
    "payload": {
      "survivor": {
        "id": "d3096090-c4ba-429d-b827-ddde83852e79",
        "name": "Nathan Canelli",
        "age": 18,
        "gender": "male",
        "lastLatitude": "00.8000",
        "lastLongitude": "-200.0000",
        "isInfected": true,
        "inventoryId": "1cab8756-a99b-466e-bedc-c2f7b8fc800c"
      }
    }
  }
  ```

## 🔗 Links

<a href="https://www.linkedin.com/in/juandebandi/"><img alt="LinkedIn" title="LinkedIn" src="https://custom-icon-badges.demolab.com/badge/-LinkedIn-231b2e?style=for-the-badge&logoColor=F8D866&logo=LinkedIn"/></a>
<a href="https://juandebandi.dev/"><img alt="Portfolio" title="Portfolio" src="https://custom-icon-badges.demolab.com/badge/-|Portfolio-1F222E?style=for-the-badge&logoColor=F8D866&logo=link-external"/></a>
<a href="mailto:juudinidev@gmail.com">
<img src="https://custom-icon-badges.demolab.com/badge/-Email-231b2e?style=for-the-badge&logoColor=F8D866&logo=gmail" alt="Email">
</a>
