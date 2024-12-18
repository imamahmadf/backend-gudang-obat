require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join, dirname } = require("path");
// const { sequelize } = require("./models"); // uncomment to use sequelize default utility
const { env } = require("./config");
const {
  obatRoutes,
  noBatchRoutes,
  userRouters,
  uptdRouters,
  amprahanRouters,
  excelRouters,
  stokOpnameRouters,
  pengaturanRouters,
  profileRouters,
  alokasiRouters,
  rusakRouters,
  kadaluwarsaRoutes,
} = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.WHITELISTED_DOMAIN
      ? process.env.WHITELISTED_DOMAIN.split(",")
      : "*",
  })
);

app.use(express.json());
app.use("/api", express.static(`${__dirname}/public`));
app.use("/obat", express.static(`${__dirname}/public/obat`));
app.use("/no-batch", express.static(`${__dirname}/public/noBatch`));
app.use("/profile", express.static(`${__dirname}/public/profile`));
// app.use(
//   "/tenant_profile_pic",
//   express.static(`${__dirname}/public/tenant_profile_pic`)
// );
// app.use("/payment", express.static(`${__dirname}/public/payment`));
// app.use("/tenant", express.static(`${__dirname}/public/tenant`));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
// sequelize.sync({ alter: true });

app.use("/api/obat", obatRoutes);
app.use("/api/no-batch", noBatchRoutes);
app.use("/api/user", userRouters);
app.use("/api/uptd", uptdRouters);
app.use("/api/amprahan", amprahanRouters);
app.use("/api/excel", excelRouters);
app.use("/api/stok-opname", stokOpnameRouters);
app.use("/api/pengaturan", pengaturanRouters);
app.use("/api/profile", profileRouters);
app.use("/api/alokasi", alokasiRouters);
app.use("/api/rusak", rusakRouters);
app.use("/api/kadaluwarsa", kadaluwarsaRoutes);
// app.use("/api/specialprice", specialPriceRouters);
// app.use("/api/property", propertyRouters);
// app.use("/api/room", roomRouters);
// app.use("/api/property", propertyRouters);
// app.use("/api/tenant", tenantRouters);
// app.use("/api/product", productRoutrs);
// app.use("/api/report", reportRouters);
// app.use("/api/tenant", tenantRouters);
// app.use("/api/reservation", reservationRouters);
// app.use("/api/payment", paymentRouters);
// app.use("/api/history", historyRouters);
// app.use("/api/roomunavailalbility", roomUnavailabilityRouters);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"), (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(err.status).end();
    }
  });
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
