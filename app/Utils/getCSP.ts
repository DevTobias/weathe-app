import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

/**
 * Provides csp headers for the document.
 *
 * @returns The csp headers as string.
 */
const getCsp = (inlineScriptSource: crypto.BinaryLike) => {
  const csp = [];
  const hash = crypto.createHash('sha256').update(inlineScriptSource);

  csp.push(`base-uri 'self'`);
  csp.push(`form-action 'self'`);
  csp.push(`default-src 'self'`);
  csp.push(
    `script-src 'self' ${isProd ? '' : ` 'unsafe-eval'`} 'sha256-${hash.digest('base64')}' data:`,
  );
  csp.push(`style-src 'self' 'unsafe-inline' fonts.googleapis.com`);
  csp.push(`connect-src 'self' vitals.vercel-insights.com`);
  csp.push(`img-src 'self' data:`);
  csp.push(`font-src 'self' fonts.gstatic.com`);
  csp.push(`frame-src *`);
  csp.push(`media-src *`);
  return csp.join('; ');
};

export default getCsp;
