const numberToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next(); 
  } else {
    res.redirect('/login'); 
  }
}

function isAdmin(req, res, next) {
  if (req.session.userRole === 'admin') {
    return next();
  } else {
    return res.send('Bukan Tugasmu!');
  }
}


module.exports = {
  numberToRupiah,
  isLoggedIn,
  isAdmin
}