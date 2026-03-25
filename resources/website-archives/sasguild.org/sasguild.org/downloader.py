
import os
import urllib2

def download(dir, url):

   files = []
   
   usock = urllib2.urlopen(url)
   html = usock.read()   
   usock.close()
   
   parts = html.split("<li><a href=\"")

   if len(parts) != 1:

      parts.pop(0)
      parts.pop(0)

      for each in parts:

         end = each.find("\"", 0)
         name = each[:end]

         if name[-1] == "/": # directory
            
            dirName = name.replace("'", "")
            dirName = dirName.replace("%20", " ")

            # create directory
            os.system("mkdir " + "\"" + dir + dirName + "\"")
            download(dir + dirName, url + name)
         else: # file 

            dirName = name.replace("'", "")
            dirName = dirName.replace("%20", " ")
           
            if name != "phil.jpg":
               usock = urllib2.urlopen(url + name)
               data = usock.read()   
               usock.close()

               outFile = open(dir + dirName, 'w')
               outFile.write(data)
               outFile.close()



# driver code

download("./", "http://www.sasguild.org/OLD/")
