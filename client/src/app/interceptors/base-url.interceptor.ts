import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = "https://biocad-cdyd.onrender.com"
  const modifiedReq = req.clone({
    url: `${baseUrl}${req.url}`
  });
  return next(modifiedReq);
};
