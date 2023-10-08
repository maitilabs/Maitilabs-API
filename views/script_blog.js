document.addEventListener('DOMContentLoaded', (event) => {
    console.log("FETCHING>>>>>>>>>>>>>>............");
    
    // Add http:// to the URL
    var blog_num = 0;
    fetch('http://localhost:3000/api/blogs')
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data);
        const blogList = document.getElementById("blogList");
  
        // Assuming your data is structured as data.blogsWithExcerpts
        data.blogsWithExcerpts.forEach((blog) => {
            blog_num++;
        //   const li = document.createElement("li");
        //   li.innerHTML = `<h2>${blog.title}</h2><p>${blog.excerpt}</p>`;
        //   blogList.appendChild(li);
        //create a nested div Element

        var outer_div = document.createElement('div');
        outer_div.className="col-md-6";

        // var inner_div = document.createElement('div');
        // inner_div.className = 'card custom-card1';
        
        // var inner_div = document.createElement('div');
        // inner_div.className = 'card-body'; 
        
        // var blog_title = document.createElement("h5");
        // blog_title.className = 'blog_title';

        // outer_div.innerHTML = `<h2>${blog.title}</h2><p>${blog.excerpt}</p>`;
        var card_position = (blog_num % 2 == 0) ? 2 : 1;
        outer_div.innerHTML = `<div class='card custom-card${card_position}'>  <div class='card-body'>  <h5><a href='http://localhost:3000/api/blogs/${blog._id}' class='blog-title'>${blog.title}</a></h5><p class = "blog-excerpt">${blog.excerpt}</p>    </div>    </div>`
        blogList.appendChild(outer_div);
        console.log(blog, card_position);
        });
  
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });