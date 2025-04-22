# **Comment Page Facebook!**

This A Simple Script To Comment Page Facebook 

# **What is this?**
This script is designed to automatically comment on new posts from a Facebook Page of your choice using your Facebook account.

We highly recommend using a secondary (backup) Facebook account for this purpose.

**`Please note`**: We are not responsible for any issues, damages, or consequences that may arise from the use of this script.


## Setup Scripts

Create a **`.env`** file out side src

**example:**

```env
  email = 'Your_email@gmail.com'
  password = 'xxxxxxxx'
  
  facebook_page_url = 'https://www.facebook.com/page'
  comment_post = 'Hello world'
```


And Create a **`cookies.json`** file out side src

**This example:**
You can now add your cookies from the puppeteer. They may be different and long, which is normal.

```json
[
  {
    "name": "xxxx",
    "value": "xxxxx",
    "domain": "xxxxx",
    "path": "x",
    "expires": xxxxx,
    "size": xx,
    "httpOnly": xxx,
    "secure": xxxx,
    "session": xxxxx,
    "sameSite": "xxxx",
    "priority": "xxx",
    "sameParty": xxx,
    "sourceScheme": "xxxx",
    "sourcePort": xx
  },
  {
    "name": "xx",
    "value": "xxxx",
    "domain": "xxxxx",
    "path": "x",
    "expires": xxxxx,
    "size": xxxx,
    "httpOnly": xxx,
    "secure": xx,
    "session": xxxx,
    "sameSite": "xxx",
    "priority": "xxx",
    "sameParty": xxxx,
    "sourceScheme": "xx",
    "sourcePort": x
  },
]
```

### How to Run
This is how to use the script

```bash
npm start
```


