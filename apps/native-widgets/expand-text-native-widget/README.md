# Expand Text Native (Read More)

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/read-more-head.png'/>

<p>A Native widget that allows you to truncate text in your native app and when pressed will expand</p>

<h4><bold>Note</bold></h4>

<p> This widget is not based on the 'famous' React Native widget <a href='https://github.com/fawaz-ahmed/react-native-read-more#readme'>@fawazahmed/react-native-read-more</a> as an implementation of that led to some performance issues, and it was decided to do a more simplistic implementation.

## Example

<table style="width:100%">
        <tr>
            <th>Android</th>
            <th>iOS</th>
        </tr>
        <tr>
            <td><img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/android-demo.gif'/></td>
            <td><img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/ios-demo.gif'/></td>
        </tr>
       
</table>
<br/>

## Setup of In Mendix

<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/exm1.png'/>
<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/exm2.png'/>
<img width='500' src='https://raw.githubusercontent.com/mendixlabs/app-services-components/main/apps/native-widgets/expand-text-native-widget/assets/exm3.png'/>
<table style="width:100%">
        <tr>
            <th>Property</th>
            <th>Details</th>
        </tr>
        <tr>
            <td>Animate?</td>
            <td>Does it animate when open or closing</td>
        </tr>
        <tr>
            <td>Number Of Lines</td>
            <td>How many lines to display before truncating</td>
        </tr>
        <tr>
            <td>Text To Display</td>
            <td>Text to truncate</td>
        </tr>
        <tr>
            <td>Show Read More</td>
            <td>Show Read More Button to user</td>
        </tr>
        <tr>
            <td>Show Read Less</td>
            <td>Show Read Less Button to user</td>
        </tr>

</table>

<h3>Read more and Read Less Section</h3>

<p>Only place text here as a too big element could break the display</p>

<br/>
<h3> Technically Note</h3>

The widget calculates the height of the closed text and open height by rendering it off screen and using that as as
closed and open heights. Adding a lot to a page on a slow device could have a performance hit `(O(n))`
