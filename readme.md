# How to use?

- add your image file in the folder
- check the dimension of you image file
- you have to update the dimenstion in three places.

### 2 changes in index.html

```  
<canvas id="canvas1" style="height:1375px;width:1179px"></canvas>
    <img src="ram1.jpg" id="img" height="1375" width="1179" /> 
```

### 1 change in app.js

```
canvas.width = 1179;
canvas.height  = 1375;
```


 