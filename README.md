# be-a-router

Uses the experimental [urlpattern](https://github.com/WICG/urlpattern) [api polyfill](https://github.com/kenchris/urlpattern-polyfill) (dist folder output).

```html
<be-a-router>
<script type=application/json>
[
    { pathname: '/myAccounts/:accountNo/statements/:statementId' },
    { pathname: 'myAccounts/398821401/transactions}
]
</script>
</be-a-router>

<nav>
    <a data-be-a-nav-link href="myAccounts/14394402/statements/201904?page=1">
        Statement for April 2019
    </a>
    <br>
    <a data-be-a-nav-link href="myAccounts/398821401/transactions?from=2020-10-01&to=2020-11-19">
        Transactions for 10/1/2020 - 11/19/2020
    </a>
</nav>
```