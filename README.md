# SPHR - Live Reload Symfony Profiler  
When you develop Symfony apps, the profiler is a great tool to debug your code. Because it's based on a specific token for each requests you make, you have to reopen it each time to refresh it. It's very painful no?  
**That's why you have to try SPHR!**  
SPHR is a desktop application and a Chrome Extension. These two piece of software can resolve all your problems!  
![SPHR Screenshot](http://img11.hostingpics.net/pics/736050Capturedcrande20160604113707.png)  
## How to use SPHR?  
> You must have NodeJs and NPM installed  

### The desktop app  
``` bash  
# First clone the App repo  
$ git clone https://github.com/mafzst/SPHR.git SPHR   
# Go to the SPHR app folder and build the app  
$ cd SPHR  
$ npm install  
# Install dependencies  

$ npm run build
# Start javascripts compilation

$ npm start
```  
### The Chrome extension  
Download the last version of Chrome Extension from [the release page](https://github.com/mafzst/SPHR/releases). Go to [chrome://extensions](chrome://extension) and drop the file to install the extension.  
You would have a new icon in the Chrome toolbar.  
Go to your Symfony site (__be sure to open the root URL__) and click on the SPHR icon. Your site is now registered on the desktop app, the profiler would be shown after the next page refresh.
