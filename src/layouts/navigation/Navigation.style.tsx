* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Ubontu", sans-serif;
  }
  
  :root {
    --blue: #287bff;
    --white: #fff;
    --grey: #f5f5f5;
    --black1: #222;
    --black2: #999;
  }
  body {
    min-height: 100vh;
    overflow-x: hidden;
  }
  .container {
    position: relative;
    width: 100%;
  }
  .navigation {
    position: fixed;
    width: 300px;
    height: 100%;
    background: var(--blue);
    border-left: 10px solid var(--blue);
    transition: 0.5s;
    overflow: hidden;
  }
  
  .navigation.active {
    width: 70px;
  }
  
  .navigation ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  
  .navigation ul li {
    position: relative;
    width: 100%;
    list-style: none;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
  }
  .navigation ul li:hover,
  .navigation ul li.hovered {
    background: var(--white);
  }
  .navigation ul li:nth-child(1) {
    margin-bottom: 40px;
    pointer-events: none;
  }
  
  .navigation ul li a {
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: var(--white);
  }
  .navigation ul li:hover a,
  .navigation ul li.hovered a {
    color: var(--blue);
  }
  
  .navigation ul li a .icon {
    position: relative;
    display: block;
    min-width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  
  .navigation ul li a .icon ion-icon {
    font-size: 1.75em;
  }
  .navigation ul li a .title {
    position: relative;
    display: block;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
  }
  
  /* curve outside */
  .navigation ul li:hover a::before,
  .navigation ul li.hovered a::before {
    content: "";
    position: absolute;
    right: 0;
    top: -50px;
    width: 50px;
    height: 50px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 35px 35px 0 10px var(--white);
    pointer-events: none;
  }
  .navigation ul li:hover a::after,
  .navigation ul li.hovered a::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -50px;
    width: 50px;
    height: 50px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 35px -35px 0 10px var(--white);
    pointer-events: none;
  }
  .main {
    position: absolute;
    width: calc(100% - 300px);
    left: 300px;
    min-height: 100vh;
    background: var(--white);
    transition: 0.5s;
  }
  
  .main.active {
    width: calc(100% - 80px);
    left: 80px;
  }
  .topbar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .toggle {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    cursor: pointer;
  }
  .search {
    position: relative;
    width: 400px;
    margin: 10px 10px;
  }
  
  .search label {
    position: relative;
    width: 100%;
  }
  .search label input {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    padding: 5px 20px;
    padding-left: 35px;
    font-size: 18px;
    outline: none;
    border: 1px solid var(--black2);
  }
  
  .search label ion-icon {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 1.2em;
  }
  .user {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    margin: 10px;
  }
  .user img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .cardBox {
    position: relative;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
  
  .cardBox .card {
    position: relative;
    background: var(--white);
    padding: 30px;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  }
  
  .cardBox .card .numbers {
    position: relative;
    font-weight: 500;
    font-size: 2.5em;
    color: var(--blue);
  }
  
  .cardBox .card .cardName {
    color: var(--black2);
    font-size: 1.1em;
    margin-top: 5px;
  }
  
  .cardBox .card .iconBx {
    font-size: 3.5em;
    color: var(--black2);
  }
  
  .cardBox .card:hover {
    background: var(--blue);
  }
  
  .cardBox .card:hover .numbers,
  .cardBox .card:hover .cardName,
  .cardBox .card:hover .iconBx {
    color: var(--white);
  }
  
  /* Chartlist */
  
  .graphBox {
    position: relative;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 30px;
    min-height: 200px;
  }
  
  .graphBox .box {
    position: relative;
    background: #fff;
    padding: 20px;
    width: 100%;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
  }
  
  .details {
    position: relative;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 30px;
    /* margin-top: 10px; */
  }
  
  .details .recent-Orders {
    position: relative;
    display: grid;
    min-height: 500px;
    background: var(--white);
    padding: 20px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
  }
  
  .card-Header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .card-Header h2 {
    font-weight: 600;
    color: var(--blue);
  }
  .btn {
    position: relative;
    padding: 5px 10px;
    background: var(--blue);
    text-decoration: none;
    color: var(--white);
    border-radius: 6px;
  }
  .btn:hover {
    background: var(--white);
    color: var(--blue);
  }
  
  .details table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  .details table thead td {
    font-weight: 600;
  }
  
  .details .recent-Orders table tr {
    color: var(--black1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .details .recent-Orders table tr:last-child {
    border-bottom: none;
  }
  
  .details .recent-Orders table tbody tr:hover {
    background: var(--blue);
    color: var(--white);
  }
  
  .details .recent-Orders table tr td {
    padding: 10px;
  }
  
  .details .recent-Orders table tr td:last-child {
    text-align: end;
  }
  
  .details .recent-Orders table tr td:nth-child(2) {
    text-align: end;
  }
  
  .details .recent-Orders table tr td:nth-child(3) {
    text-align: center;
  }
  
  .status.delivered {
    padding: 2px 4px;
    background: #8de02c;
    color: var(--white);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  
  .status.return {
    padding: 2px 4px;
    background: #bc29e0;
    color: var(--white);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  
  .status.progress {
    padding: 2px 4px;
    background: #ec3f96;
    color: var(--white);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  
  .status.pending {
    padding: 2px 4px;
    background: #f73e3e;
    color: var(--white);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  
  .recent-Customers {
    position: relative;
    display: grid;
    min-height: 500px;
    padding: 20px;
    background: var(--white);
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
  }
  
  .recent-Customers .imgBx {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    overflow: hidden;
  }
  
  .recent-Customers .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .recent-Customers table tr:hover {
    background: var(--blue);
    color: var(--white);
  }
  
  .recent-Customers table tr td {
    padding: 12px 10px;
  }
  
  .recent-Customers table tr td h4 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2em;
  }
  .recent-Customers table tr td h4 span {
    font-size: 14px;
    color: var(--black2);
  }
  
  .recent-Customers table tr:hover {
    background: var(--blue);
    color: var(--white);
  }
  
  .recent-Customers table tr:hover td h4 span {
    color: var(--white);
  }
  
  /* Responsive */
  
  @media (max-width: 991px) {
    .navigation {
      left: -300px;
    }
    .navigation.active {
      width: 300px;
      left: 0;
    }
    .main {
      width: 100%;
      left: 0;
    }
    .main.active {
      left: 300px;
    }
    .cardBox {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .details {
      grid-template-columns: repeat(1, 1fr);
    }
    .recent-Orders {
      overflow-x: auto;
    }
  }
  
  @media (max-width: 480px) {
    .cardBox {
      grid-template-columns: repeat(1, 1fr);
    }
    .card-Header h2 {
      font-size: 20px;
    }
    .user {
      min-width: 40px;
    }
    .navigation {
      width: 100%;
      left: -100%;
      z-index: 1000;
    }
    .navigation.active {
      width: 100%;
      left: 0;
    }
    .toggle {
      z-index: 10001;
    }
  
    .main.main.active .toggle {
      color: #fff;
      position: fixed;
      right: 0;
      left: initial;
      color: var(--white);
    }
  }
  