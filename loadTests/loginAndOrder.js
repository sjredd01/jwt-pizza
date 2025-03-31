import { sleep, check, group, fail } from "k6";
import http from "k6/http";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 5, duration: "30s" },
        { target: 15, duration: "1m" },
        { target: 10, duration: "30s" },
        { target: 0, duration: "30s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  const vars = {};

  group("page_2 - https://pizza.sjredd01.click/", function () {
    response = http.put(
      "https://pizza-service.sjredd01.click/api/auth",
      '{"email":"d@jwt","password":"diner"}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );

    if (
      !check(response, {
        "status equals 200": (response) => response.status.toString() === "200",
      })
    ) {
      console.log(response.body);
      fail("Login was *not* 200");
    }

    vars["token"] = jsonpath.query(response.json(), "$.token")[0];

    response = http.options(
      "https://pizza-service.sjredd01.click/api/auth",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "content-type",
          "access-control-request-method": "PUT",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );
    sleep(8.5);

    response = http.get("https://pizza-service.sjredd01.click/api/order/menu", {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${vars["token"]}`,
        "content-type": "application/json",
        "if-none-match": 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
        origin: "https://pizza.sjredd01.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    });

    response = http.options(
      "https://pizza-service.sjredd01.click/api/order/menu",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "GET",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );

    response = http.get("https://pizza-service.sjredd01.click/api/franchise", {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${vars["token"]}`,
        "content-type": "application/json",
        "if-none-match": 'W/"40-EPPawbPn0KtYVCL5qBynMCqA1xo"',
        origin: "https://pizza.sjredd01.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    });

    response = http.options(
      "https://pizza-service.sjredd01.click/api/franchise",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "GET",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );
    sleep(6.6);

    response = http.post(
      "https://pizza-service.sjredd01.click/api/order",
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          authorization: `Bearer ${vars["token"]}`,
          "content-type": "application/json",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );

    response = http.options(
      "https://pizza-service.sjredd01.click/api/order",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "POST",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      }
    );
    sleep(9.6);

    response = http.post(
      "https://pizza-factory.cs329.click/api/order/verify",
      '{"jwt":"eyJpYXQiOjE3NDM0NDQxOTksImV4cCI6MTc0MzUzMDU5OSwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJzcmVkZDMiLCJuYW1lIjoiU2FtIFJlZGQifSwiZGluZXIiOnsiaWQiOjMsIm5hbWUiOiJkaW5lciIsImVtYWlsIjoiZEBqd3QifSwib3JkZXIiOnsiaXRlbXMiOlt7Im1lbnVJZCI6MSwiZGVzY3JpcHRpb24iOiJWZWdnaWUiLCJwcmljZSI6MC4wMDM4fV0sInN0b3JlSWQiOiIxIiwiZnJhbmNoaXNlSWQiOjEsImlkIjoxfX0.lN3vAUmETMuzeW9byZ4XbzuxgyY_09dDxexsA8FHta_cEhR0kPoR-s_2YpHOqDmg-DCijqX78yGVRdB-uULIfXLZ9l7iDidCGNhhgbsNhIDULYedWTFlqJuMlAz3OsupY2eVrLegH2-GrtqE84NGy6DEZPG_Bt2vRq5RWuUFZMeDuoardmdg_A-ELGWw3zfYACw401gckM6y9goCDAaq9m8cAmJqwrX1fqFHerS1x4i-QForxhc9PyYX3d9rpyBPMaLb3xDgLaBOfVcWhKOysHBtEAb-mslDkY8ZLX4aEp-aPmsCENz2-9MvqfYwI6RJRvJ_up0CI7xdhpxk5gXRiyOW4XmGe8KAf0ciAk-EShy30_NArULLvCAdL-lsGGUEhkroofqfwxypSCWXViWCQv62KTOa_9qQkWfOzJfWXqqmISj5SFn_SZpdmsmq5KE3r3bLR4NqV65C1W5xJrRTvH1zshk0fAhHDT5bj4SbLj193HKyk6VITY72BAKE-1-3d8Qg5c3mtKisRxnkrk1ayUjLzpvIAcgexdUVD0EyxzZoTMZ1xtMH0RLyAQ4VBtex4ehyuTyWSYqePFIzilVkPYxysygvqgrOJDs6AZ9xtARqsj4dycS6ROErfkbq9xYfcYr6ekIT25uRrTRe5S2AviFpq8k6ROMFCGVAKP_wTuo"}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          authorization: `Bearer ${vars["token"]}`,
          "content-type": "application/json",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "sec-fetch-storage-access": "active",
        },
      }
    );

    response = http.options(
      "https://pizza-factory.cs329.click/api/order/verify",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "POST",
          origin: "https://pizza.sjredd01.click",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
      }
    );
  });
}
