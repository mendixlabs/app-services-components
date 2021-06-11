<p align="center">
 <img  align="center" alt="headerIMG"  width="600" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/countdown-timer-widget/CountdowntimerwidgetAssets/CountdownTimer.png" target="_blank" />
  <br/>
  <br/>
  <h2 align="center">
A Mendix widget to display a count down, that you can style. You also have the ability to model our own end message and fire an action
  </h2>
 
</p>
<p align="center">
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.12%2B-blue.svg?style=for-the-badge" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg?style=for-the-badge" target="_blank" />
  </a>
  <br/>
</p>
<br/>
<h3>Examples</h3>
  <img  alt="headerIMG" width="400" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/countdown-timer-widget/CountdowntimerwidgetAssets/ds3.gif" target="_blank" />
<br/>
<h3>Usage</h3>

<img align="center" width="550" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/countdown-timer-widget/CountdowntimerwidgetAssets/ds1.png" target="_blank" />

|               | Type       | Info                                               |
| ------------- | ---------- | -------------------------------------------------- |
| End Date Time | `DateTime` | Attribute of when the "event" ends (Future Date)   |
| When Done     | `action`   | An action that is called when Date Time is reached |

<br/>
<img align="center" width="550" src="https://raw.githubusercontent.com/mendixlabs/app-services-components/main/packages/web-widgets/countdown-timer-widget/CountdowntimerwidgetAssets/ds2.png" target="_blank" />

|                 | Type      | Info                                           |
| --------------- | --------- | ---------------------------------------------- |
| Main display    | `boolean` | A way to turn on or off what values to display |
| Display Legends | `boolean` | Display Legends                                |

<br/>
<h4>Class Names Available</h4>

| Class Name                         | Info                                           |
| ---------------------------------- | ---------------------------------------------- |
| `widget_countDownTimer__container` | Container Class Name (Wrapped Whole Widget)    |
| `widget_countDownTimer__value`     | Value Class Name (Wrapped Value and Separator) |
| `widget_countDownTimer__separator` | Separator Class Name                           |
| `widget_countDownTimer__legend`    | Legend Class Name                              |
| `widget_countDownTimer__days`      | Days Class Name                                |
| `widget_countDownTimer__hours`     | Hours Class Name                               |
| `widget_countDownTimer__minutes`   | Minutes Class Name                             |
| `widget_countDownTimer__seconds`   | Seconds Class Name                             |
| `widget_countDownTimer__digit`     | Class Name on Individual Numbers               |

## Known Issues

Fast Scrolling causes Issue if Smart Compensator is on

## Issues || Track Features

Open an GH [issue](https://github.com/mendixlabs/app-services-components/issues/new/choose).
