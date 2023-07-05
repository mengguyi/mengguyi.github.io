const e=JSON.parse(`{"key":"v-6a8c21ea","path":"/en/articles/GitLab-Install.html","title":"GitLab EE 16 install and cracking tutorial","lang":"en-US","frontmatter":{"cover":"/assets/images/GitLab-Install-cover.avif","title":"GitLab EE 16 install and cracking tutorial","icon":"download","order":2,"category":["Guide","Tutorial","Network","Crack"],"tag":["GitLab","Linux","Git","Ruby","Golang","Debian"],"description":"GitLab is an open source application developed mainly in Ruby on Rails language, which implements a self-hosted Git project repository that can be accessed and managed through a web interface. In short, it is a GitHub that can be deployed privately.","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog.mengguyi.com/articles/GitLab-Install.html"}],["meta",{"property":"og:url","content":"https://blog.mengguyi.com/en/articles/GitLab-Install.html"}],["meta",{"property":"og:site_name","content":"MengGuyi's blog"}],["meta",{"property":"og:title","content":"GitLab EE 16 install and cracking tutorial"}],["meta",{"property":"og:description","content":"GitLab is an open source application developed mainly in Ruby on Rails language, which implements a self-hosted Git project repository that can be accessed and managed through a web interface. In short, it is a GitHub that can be deployed privately."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.mengguyi.com/assets/images/GitLab-Install-cover.avif"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-05T17:19:08.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"GitLab EE 16 install and cracking tutorial"}],["meta",{"property":"article:author","content":"MengGuyi"}],["meta",{"property":"article:tag","content":"GitLab"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"Ruby"}],["meta",{"property":"article:tag","content":"Golang"}],["meta",{"property":"article:tag","content":"Debian"}],["meta",{"property":"article:modified_time","content":"2023-07-05T17:19:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GitLab EE 16 install and cracking tutorial\\",\\"image\\":[\\"https://blog.mengguyi.com/assets/images/GitLab-Install-cover.avif\\"],\\"dateModified\\":\\"2023-07-05T17:19:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MengGuyi\\",\\"url\\":\\"https://www.mengguyi.com\\"}]}"]]},"headers":[{"level":2,"title":"Note","slug":"note","link":"#note","children":[]},{"level":2,"title":"Prepare the environment","slug":"prepare-the-environment","link":"#prepare-the-environment","children":[]},{"level":2,"title":"Compile Gitaly","slug":"compile-gitaly","link":"#compile-gitaly","children":[]},{"level":2,"title":"Compile GitLab","slug":"compile-gitlab","link":"#compile-gitlab","children":[{"level":3,"title":"Clone GitLab source code","slug":"clone-gitlab-source-code","link":"#clone-gitlab-source-code","children":[]},{"level":3,"title":"Configure GitLab","slug":"configure-gitlab","link":"#configure-gitlab","children":[]},{"level":3,"title":"Configure puma","slug":"configure-puma","link":"#configure-puma","children":[]},{"level":3,"title":"Configure Redis","slug":"configure-redis","link":"#configure-redis","children":[]},{"level":3,"title":"Modify the database configuration file","slug":"modify-the-database-configuration-file","link":"#modify-the-database-configuration-file","children":[]},{"level":3,"title":"Install bundler and use bundler to install dependencies","slug":"install-bundler-and-use-bundler-to-install-dependencies","link":"#install-bundler-and-use-bundler-to-install-dependencies","children":[]},{"level":3,"title":"Install GitLab Shell","slug":"install-gitlab-shell","link":"#install-gitlab-shell","children":[]},{"level":3,"title":"Edit the GitLab Shell configuration file","slug":"edit-the-gitlab-shell-configuration-file","link":"#edit-the-gitlab-shell-configuration-file","children":[]},{"level":3,"title":"Install GitLab Enterprise Edition Features","slug":"install-gitlab-enterprise-edition-features","link":"#install-gitlab-enterprise-edition-features","children":[]}]},{"level":2,"title":"Install GitLab Pages","slug":"install-gitlab-pages","link":"#install-gitlab-pages","children":[]},{"level":2,"title":"Install Gitaly","slug":"install-gitaly","link":"#install-gitaly","children":[]},{"level":2,"title":"Install the service","slug":"install-the-service","link":"#install-the-service","children":[]},{"level":2,"title":"Set up Logrotate","slug":"set-up-logrotate","link":"#set-up-logrotate","children":[]},{"level":2,"title":"Start Gitaly","slug":"start-gitaly","link":"#start-gitaly","children":[]},{"level":2,"title":"Initialize Database and Activate Advanced Features","slug":"initialize-database-and-activate-advanced-features","link":"#initialize-database-and-activate-advanced-features","children":[]},{"level":2,"title":"Check Application Status","slug":"check-application-status","link":"#check-application-status","children":[]},{"level":2,"title":"Compile Assets","slug":"compile-assets","link":"#compile-assets","children":[]},{"level":2,"title":"GitLab Start!","slug":"gitlab-start","link":"#gitlab-start","children":[]},{"level":2,"title":"Nginx configuration","slug":"nginx-configuration","link":"#nginx-configuration","children":[]},{"level":2,"title":"Double-check Application Status","slug":"double-check-application-status","link":"#double-check-application-status","children":[]},{"level":2,"title":"Initial login","slug":"initial-login","link":"#initial-login","children":[]},{"level":2,"title":"Activate GitLab","slug":"activate-gitlab","link":"#activate-gitlab","children":[]},{"level":2,"title":"References","slug":"references","link":"#references","children":[]}],"git":{"createdTime":1688555785000,"updatedTime":1688577548000,"contributors":[{"name":"孟古一","email":"my@mengguyi.com","commits":3}]},"readingTime":{"minutes":6.55,"words":1966},"filePathRelative":"en/articles/GitLab-Install.md","localizedDate":"July 5, 2023","excerpt":"<p><a href=\\"https://gitlab.com\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">GitLab</a> is an open source application developed mainly in Ruby on Rails language, which implements a self-hosted Git project repository that can be accessed and managed through a web interface. In short, it is a <a href=\\"https://github.com\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">GitHub</a> that can be deployed privately.</p>","autoDesc":true}`);export{e as data};
