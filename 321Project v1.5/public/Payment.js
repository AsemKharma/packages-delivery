/*
    <div
              class="u-container-layout u-similar-container u-container-layout-1"
            >
              <!--blog_post_header-->
              <h4 class="u-blog-control u-text u-text-1">
                <a class="u-post-header-link" 
                  ><!--blog_post_header_content-->+"Package Number: "+element.PackageNum+<!--/blog_post_header_content--></a
                >
              </h4>
              <!--/blog_post_header--><!--blog_post_content-->
              <div class="u-blog-control u-post-content u-text u-text-2">
                <!--blog_post_content_content-->+"Category :"element.Category +", Destination:"+element.Destination+ <!--/blog_post_content_content-->
              </div>
              <!--/blog_post_content--><!--blog_post_readmore-->
              <a
                id:"PayClicked"
                class="u-blog-control u-btn u-button-style u-btn-2"
                >Pay</a
              >
            </div>
          </div>

          <!-- -------------------------------------------->
          <div>
            <div
              class="u-container-layout u-similar-container u-container-layout-1"
            >
              <h4 class="u-blog-control u-text u-text-1">
                <a class="u-post-header-link">package number</a>
              </h4>

              <div class="u-blog-control u-post-content u-text u-text-2">
                more details 23e
              </div>

              <a
                href="blog/post-5.html"
                class="u-blog-control u-btn u-button-style u-btn-2"
                >pay</a
              >
            </div>
          </div>

            */
console.log("entered! ")
const pkgs = document.getElementById('payment')
getPackages()
function getPackages() {
    let url=window.location.href.substring(0,21)+'/ListPayment';
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        }
      };
      try {
        fetch(url,options).then(res => res.json()).then(data => {
            pkgs.innerHTML=''
            removeNull = data.filter(function (e) { return e })
            console.log(removeNull)
            removeNull.forEach(element => {
    
        
    pkgs.innerHTML=pkgs.innerHTML+`<div class="u-container-layout u-similar-container u-container-layout-1"> <!--blog_post_header--><h4 class="u-blog-control u-text u-text-1"> <a class="u-post-header-link"  >
            <!--blog_post_header_content-->Package Number: ${element.PackageNum}<!--/blog_post_header_content--></a></h4><!--/blog_post_header--><!--blog_post_content--><div class="u-blog-control u-post-content u-text u-text-2">
            <!--blog_post_content_content-->Category :${element.Category} , Destination: ${element.Destination} <!--/blog_post_content_content-->
            </div><!--/blog_post_content--><!--blog_post_readmore--><a  href="/Pay/${element.PackageNum}" id:"PayClicked" class="u-blog-control u-btn u-button-style u-btn-2" > Pay </a > </div> </div>`    
    });
    
    
        })
      } catch (error) {
        
      }
}