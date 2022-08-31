# Lottie Native Widget for Mendix

<h2><b>Only works with a Custom Mendix Make it Native App</b></h2>
<p> Read more about that <a href='https://docs.mendix.com/refguide/mobile/distributing-mobile-apps/building-native-apps/native-build-locally/'>here</a>

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/lottie-native-head.png'/>

## Example

<table style="width:100%">
        <tr>
            <th>Android</th>
            <th>iOS</th>
        </tr>
        <tr>
            <td><img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/androind-demo.gif'/></td>
            <td><img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/ios-demo.gif'/></td>
        </tr>
       
</table>

## Setup of In Mendix

-   ### General

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/studio-setup.png'/>
<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/Sequential-General.png'/>

<table style="width:100%">
        <tr>
            <th>Property</th>
            <th>Details</th>
        </tr>
        <tr>
            <td>Animation JSON</td>
            <td>String version of your JSON animation. You can use <a target="_blank" href="https://afl.welgemoed.io/">this</a> app to just drop your animation <code>.json</code> and get the correct <code>string</code> back</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>Height of Animation (Use <code>full</code>  for Device Height)</td>
        </tr>
        <tr>
            <td>Width</td>
            <td>Width of Animation (Use <code>full</code>  for Device Width)</td>
        </tr>
        <tr>
            <td>Use as Background</td>
            <td>True if animations is set as background and other properties is places "over" it</td>
        </tr>
        <tr>
            <td>Control Type</td>
            <td><b>Uncontrolled (Sequential):</b> You define the frames to play, the animation will sequentially follow the animation path you define. <br/> <br/>
            <b>Controlled:</b> You control the Frames by changing parameters on the fly
            </td>
        </tr>
</table>
<br/> <br/>

-   ### Uncontrolled (Sequential)

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/Sequential-Setup.png'/>
<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/Sequential-Details.png'/>

<table style="width:100%">
        <tr>
            <th>Property</th>
            <th>Details</th>
        </tr>
        <tr>
            <td>Start Frame</td>
            <td>Frame to start section at</td>
        </tr>
        <tr>
            <td>End Frame</td>
            <td>Frame to End section at</td>
        </tr>
        <tr>
           <td>Loop</td>
            <td>Should that section Loop <br/><b>Note: </b> If this is set to true, that section will play forever and the next section will not be reached. Only use this on the last section</td>
        </tr>
        <tr>
            <td>When Done</td>
            <td>Action to call when that section is done</td>
        </tr>
</table>
<br/> <br/>

-   ### Controlled (Non-Persistabile)

<b>Note:</b> This has to be used in a data view with a corresponding Data Model

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/Controlled-DM.png'/>
<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/Controlled-Setup.png'/>

<table style="width:100%">
        <tr>
            <th>Property</th>
            <th>Details</th>
        </tr>
        <tr>
            <td>Start Frame <code>expression</code></td>
            <td>Frame to start section at</td>
        </tr>
        <tr>
            <td>End Frame <code>expression</code></td>
            <td>Frame to End section at</td>
        </tr>
        <tr>
           <td>Loop <code>expression</code></td>
            <td>When set to <code>false</code> the animation will not loop 
            <br/><b>Note:</b> This will set the Play/Pause  <code>attribute</code> to <code>false</code></td>
        </tr>
        <tr>
            <td>Play/Pause <code>attribute</code></td>
            <td>An attribute that will play or pause the animation, this wont immediately pause the animation, but it will finish its current section, and pause once it reaches its End Frame</td>
        </tr>
</table>

### JSON to String

You can use this app we built to help convert a `json` file to a string that Mendix can use, below is a gif demo of the
app and a [link](https://afl.welgemoed.io/) to the site

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/lottie-native/assets/demo-afl.gif'/>

### Extra Info

Lottie [Docs](https://github.com/lottie-react-native/lottie-react-native)
