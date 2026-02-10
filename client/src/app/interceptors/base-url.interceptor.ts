import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = "http://localhost:3003"
  const modifiedReq = req.clone({
    url: `${baseUrl}${req.url}`
  });
  return next(modifiedReq);
};
