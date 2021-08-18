<h1 align="center">Image Carousel Widget (Mendix Widget)</h1>

<p align="center">
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/badge/Status-Production-blue?style=for-the-badge" target="_blank" />
  </a>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/github/issues/ahwelgemoed/image-carousel-widget?style=for-the-badge" target="_blank" />
  </a>
  <a href="">
    <img alt="GitHub issues" src="https://img.shields.io/github/release/ahwelgemoed/image-carousel-widget?style=for-the-badge" target="_blank" />
  </a>
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.12%2B-blue.svg?style=for-the-badge" target="_blank" />
  </a>
  <a href="https://docs.mendix.com/developerportal/app-store/app-store-content-support">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg?style=for-the-badge" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg?style=for-the-badge" target="_blank" />
  </a>
  <br/>
</p>
<p align="center">
 <img  align="center" alt="headerIMG" src="./assets/CarouselHeader.png" target="_blank" />
  <br/>
  <br/>
  <h2 align="center">
    A Mendix Image Carousel Widget 
  </h2>
  <h5 align="center"> 
    Responsive and Customizable 
  </h5>
</p>
<br/>
<h3>Usage</h3>
<img align="center" width="550" alt="headerIMG" src="./assets/Usage.png" target="_blank" />
<br/>

|                 | Type         | Info                                                                                 |
| --------------- | ------------ | ------------------------------------------------------------------------------------ |
| Data            | `datasource` | Datasource of Datamodel to display. Linked to a System Image in One to Many Relation |
| Max Height      | `number`     | Max height of the Container, Optimize this value for the Images you plan on using    |
| Max Width       | `number`     | Max Width of the Container, Optimize this value for the Images you plan on using     |
| Auto Play       | `boolean`    | Should Images Automatically Scroll                                                   |
| Stop on Hover   | `boolean`    | Should Stop Scroll on Hover over Image                                               |
| Infinite Loop   | `boolean`    | Should Images Scroll forever                                                         |
| Swipeable       | `boolean`    | Allow touch and track devices to scroll on Swipe                                     |
| Show Arrows     | `boolean`    | Display Next/Prev Arrows                                                             |
| Dynamic Height  | `boolean`    | Should Height be based on Image Height (use with caution with Max Height)            |
| Show Indicators | `boolean`    | Show Indicators Dots on Images                                                       |
| Keyboard Arrows | `boolean`    | Should Scroll be affected by Keyboard Arrows                                         |

<br/>

<h4>Exposed Class Names</h4>

|                                       | Desc.                                                      |
| ------------------------------------- | ---------------------------------------------------------- |
| `Image-Carousel__Prev`                | Class Name on Prev Button                                  |
| `Image-Carousel__Next`                | Class Name on Next Button                                  |
| `Image-Carousel__Content`             | Class Name on Anything you place in the Content box        |
| `Image-Carousel__Content__INDEXNUMER` | Class Name on Everything in Content Box based in its Index |

<br/>

**Note** - `Carousel__Content__INDEXNUMER` if there are 2 Images the first Image's class name will be
`Carousel__Content__0` the second `Carousel__Content__1`

<br/>

<h4>Examples</h4>

<img align="center" width="550" alt="headerIMG" src="./assets/ex1.png" target="_blank" />

<br/>

<img align="center" width="550" alt="headerIMG" src="./assets/ex2.png" target="_blank" />

<br/>

<img align="center" width="550" alt="headerIMG" src="./assets/ex3.png" target="_blank" />

<br/>

<img align="center" width="550" alt="headerIMG" src="./assets/ex4.png" target="_blank" />
