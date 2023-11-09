<br />

![GitHub repo size](https://img.shields.io/github/repo-size/eddiesosera/macloops?color=%23FF4C54)
![GitHub watchers](https://img.shields.io/github/watchers/eddiesosera/macloops?color=%23FFA191)
![GitHub language count](https://img.shields.io/github/languages/count/eddiesosera/macloops?color=%231EBBBA)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/eddiesosera/macloops?color=%234E54AD)

<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks]][forks-url]
[![Starsgazers][stars]][stars-url]

#

![Header][header]

<div align="center">

  <h3 align="center">Mcloops </h3>

  <p align="center">
    Macloops: A MERN Stack E-Commerce Dashboard for Musicians
    <br />
    <br />
    Eddie Sosera
    <br />
    <br />
    <a href="https://github.com/eddiesosera/macloops/blob/main/"><strong>Explore the docs</strong></a>
    <br />
    <br />
    <a href="add The demo Video Link here">View Demo</a>
    ·
    <a href="https://github.com/eddiesosera/macloops/issues">Report Bug</a>
    ·
    <a href="https://github.com/eddiesosera/macloops/issues">Request Feature</a>
  </p>
  <br />
</div>

## About this Project

![Banner][banner]

Macloops is a musician-focused e-commerce dashboard designed as a dynamic hub. It provides user-friendly features for easy inventory navigation, sales tracking, and order management.

<br />
<br />

# Table of Contents

- [Built With](#built-with)
- [Installation](#installation)
- [Features](#features)
- [Technical Functionality](#technical-functionality)
- [Development Process](#development-process)
- [Final Outcomes](#final-outcomes)
- [Reporting Issues](#reporting-issues)
- [Authors](#authors)
- [Licenses](#licenses)
- [Contact](#contact)

<br />
<br />

## Built With

- [![React][react.js]][react-url]
- [![Express][express.js]][express-url]
- [![Mongodb][mongodb]][mongodb-url]
- [![jwt][jwt]][jwt-url]
- [![bootstrap][bootstrap]][bootstrap-url]
- [![nodemon][nodemon]][nodemon-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/eddiesosera/macloops.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the client server in `client/term4-group2-qna`
   ```sh
   npm start
   ```
4. Start the backend server in `server` file
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />
<br />

<!-- FEATURES -->

## Features

<!-- ### Homescreen -->

![Homescreen][home]
The homescreen displays all the questions which you can filter by upvotes and time (by default it shows the latest). You can answer other people’s questions by clicking on `Answer(0)`.

<br />
<!-- ### Question Page -->

![Question][question]
The question page allows users to give an answer to the question and they can browse through other answers for help.
Users can also reply to answers.

<br />
<!-- ### Create Question -->

![Create Question][createquestion]
The Create Question page allows users to create questions by filling in the form they can also add images with a size limit of 500kb.

<br />
<!-- ### Search Bar -->

![Search Bar][searchbar]
The search allows users to search anything from questions, users and topics. The most relevant results will be at the top. The orange button takes you to the question results page.

<br />
<!-- ### Search Results -->

![Search Results][searchresults]
The question results displays more than 5 results as seen in the question bar. Additionally the user can filter the type of results.

<br />
<!-- ### User Profile -->

![User Profile][userprofile]
The User Profile is a summary of the user’s information such reliability score, bio, questions asked, replies and answers.

The reliability score is generated based on the user’s number of questions and the number of votes each question has.

They have the option to edit their profile.

<br />
<!-- ### Admin -->

![Admin][admin]
The admin’s view gives the admin special permission to delete ant user’s question.

<br/>
<br/>

#### ERD

![Entity Relationship Diagram][erd]

## Tech/Framework used

| Styling | Front-End Functionality | Backend    | Database |
| ------- | :---------------------- | ---------- | :------: |
| CSS     | React                   | Express.js | MongoDB  |

<br/>
<br/>

#### Technical Funtionality

- `CRUD funtionality` on Questions, Answers, Replies(additional) and Users.
- `Upvote and Downvote` questions.
- `Search and Filter` Questions being displayed.
- `Authentication` using password encryption library.
- `Authorization` using tokens (JWTs).
- `Reliability score` system based on interaction.

<br/>

#### Flow Diagram

![Flow Diagram][flowdiagram]

<br />

#### Use Case

![Use Case Diagram][usecase]

<br />

#### Wireframes

![Homescreen wireframe][wf-home]

<br />
<br />
<!-- DEVELOPMENT PROCESS -->

## Development Process

The `Development Process` the technical implementations and functionality done for the website.

#### Highlights

The setup of the project was overal fun for me as I got the opportunity explore complex task like creating dynamic functions that work as a state store without using any library.

#### Challenges

Generally the project was not challenging as we did a similar project in our previous term, however the backend was a bit challenging as I had to familiarize myself again with `Vanailla Javascript.`

<br/>
<br/>
<!-- FINAL OUTCOMES -->

## Final Outcomes

[View Demonstration](https://www.youtube.com/watch?v=K2TSUsroUAA)

<!-- CONCLUSION -->

<br/>
<br/>

<!-- CONCLUSION -->

## Conclusion

### How to Contribute

1. **Fork the repository:**

   - Fork this repository to your GitHub account.

2. **Clone your fork:**

   - Clone the repository to your local machine using the following command:
     ```
     git clone https://github.com/eddiesosera/macloops.git
     ```

3. **Create a branch:**

   - Create a new branch for your feature or bug fix:
     ```
     git checkout -b feature-branch
     ```

4. **Make your changes:**

   - Make your desired changes in the codebase.

5. **Test your changes:**

   - Ensure that your changes do not introduce new issues.
   - Run relevant tests if available.

6. **Commit your changes:**

   - Commit your changes with a descriptive commit message:
     ```
     git commit -m "Your informative commit message"
     ```

7. **Push your changes:**

   - Push your changes to your forked repository:
     ```
     git push origin feature-branch
     ```

8. **Create a pull request:**
   - Open a pull request against the `main` branch of the original repository.
   - Provide a clear title and description for your pull request.

<br/>
<br/>
<!-- REPORTING ISSUES -->

### Reporting Isssues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/eddiesosera/macloops/issues) on GitHub.

<br/>
<!-- AUTHORS -->

### Authors

<div style="display: flex; justify-content: space-between;">
  <div style="text-align: center;">
    <a href="https://github.com/eddiesosera/">
      <img src="https://github.com/eddiesosera.png" alt="eddie Sosera" width="100px">
    </a>
    <br>
    <sub>Eddie Sosera</sub>
  </div>
  <br />
</div>

<br/>
<!-- LICENSE -->

### License

Distributed under the MIT License. See [License](https://opensource.org/license/mit/) for more information.

<br/>

### Contact

**LinkedIn** - [@eddiesosera](https://www.linkedin.com/in/eddiesosera/), or
[Visit website](https://engineeredimagination.co.za).

<br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RESOURCES USED LINK -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
[mongodb]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[jwt]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[jwt-url]: https://jwt.io/
[bootstrap]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com/
[nodemon]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[nodemon-url]: https://nodemon.io/
[contributors-shield]: https://img.shields.io/github/contributors/eddiesosera/macloops.svg?style=for-the-badge
[contributors-url]: https://github.com/eddiesosera/macloops/graphs/contributors
[forks]: https://img.shields.io/github/forks/eddiesosera/macloops.svg?style=for-the-badge
[forks-url]: https://github.com/eddiesosera/macloops/forks
[stars]: https://img.shields.io/github/stars/eddiesosera/macloops.svg?style=for-the-badge
[stars-url]: https://github.com/eddiesosera/macloops/stargazers
[eddie-img]: https://github.com/eddiesosera.png*-

<!-- Screens and Headers-->

[banner]: client/src/assets/readme/banner.png
[header]: client/src/assets/readme/header.png
[home]: client/src/assets/readme/features/macloops_feature_home.png
[question]: client/src/assets/readme/features/macloops_feature_question.png
[createquestion]: client/src/assets/readme/features/macloops_feature_createQuestion.png
[searchbar]: client/src/assets/readme/features/macloops_feature_searchbar.png
[searchresults]: client/src/assets/readme/features/macloops_feature_searchResults.png
[userprofile]: client/src/assets/readme/features/macloops_feature_userProfile.png
[admin]: client/src/assets/readme/features/macloops_feature_admin.png

<!-- Process-->

[usecase]: client/src/assets/readme/process/useCase.png
[flowdiagram]: client/src/assets/readme/process/useCase.png

<!-- Wireframes-->

[wf-home]: client/src/assets/readme/wireframes/home.png
