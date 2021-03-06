# be-a-router

Uses the experimental [urlpattern](https://github.com/WICG/urlpattern) [api polyfill](https://github.com/kenchris/urlpattern-polyfill) (dist folder output).

```html
    <be-a-router><script type="application/json">[
        { 
            "pathname": "myAccounts/:accountNo/statements/:statementId",
            "baseURL": "http://localhost:8000"
        },
        { 
            "pathname": "myAccounts/:accountNo/transactions",
            "baseURL": "http://localhost:8000"
        }
    ]</script></be-a-router>

<nav be-a-router>
    <a be-a-nav-link href="myAccounts/14394402/statements/201904?page=1">
        Statement for April 2019
    </a>
    <br>
    <a be-a-nav-link href="myAccounts/398821401/transactions?from=2020-10-01&to=2020-11-19">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>
```

Features suppored:

1.  Uses history.state -- parsed url is put into history.
2.  If sending the url to a friend or bookmarking a selected link for future use, history can be restored.