import './globals.css';
import Header from '@/ui/shared/Header';
import { Roboto_Condensed } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { ProgressBar } from '@/ui/components/progress-bar';
import MessageApp from '@/ui/components/MessageApp';

const roboto_condensed = Roboto_Condensed({ subsets: ['latin'] });

export const metadata = {
    metadataBase: new URL(process.env.APP_URL),
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                {process.env.NODE_ENV === 'production' && (
                    <>
                        <Script src="/popAds.js" />
                        <Script id="chatBroEmbedCode" src="/chat.js" />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `function c74a68dfbd15fcd6f23a6b26879bc82e() { console.clear(); var before = (new Date).getTime(); debugger; var after = (new Date).getTime(); if (after - before > 200) { document.write(""); self.location.replace(window.location.protocol + window.location.href.substring(window.location.protocol.length)) } else { before = null; after = null; delete before; delete after } setTimeout(c74a68dfbd15fcd6f23a6b26879bc82e, 100) }c74a68dfbd15fcd6f23a6b26879bc82e(); window.onload = function () { document.addEventListener("contextmenu", function (e) { e.preventDefault() }, false); document.addEventListener("keydown", function (e) { if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { disabledEvent(e) } if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { disabledEvent(e) } if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { disabledEvent(e) } if (e.ctrlKey && e.keyCode == 85) { disabledEvent(e) } if (event.keyCode == 123) { disabledEvent(e) } }, false); function disabledEvent(e) { if (e.stopPropagation) { e.stopPropagation() } else if (window.event) { window.event.cancelBubble = true } e.preventDefault(); return false } };`,
                            }}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `function _0x2f9b(_0x407218,_0x302151){var _0x506a44=_0x506a();return _0x2f9b=function(_0x2f9b69,_0x2e009c){_0x2f9b69=_0x2f9b69-0xb4;var _0x4c2cff=_0x506a44[_0x2f9b69];return _0x4c2cff;},_0x2f9b(_0x407218,_0x302151);}function _0x506a(){var _0x4969d7=['4954960bDMhOF','outerHeight','16jcYMJb','isInitialized','6309678gYisoM','devtools','open','3301146fQIElG','412416TPNEdb','Firebug','devtoolschange','innerHeight','6222139CbZKnd','Herramientas\x20de\x20desarrollador\x20cerradas.','22nbHoqe','undefined','dispatchEvent','chrome','orientation','horizontal','20aaNEBT','2yFfdbI','exports','Se\x20ha\x20detectado\x20el\x20uso\x20de\x20herramientas\x20de\x20desarrollador.','923383GowmYV','3102970dOERug'];_0x506a=function(){return _0x4969d7;};return _0x506a();}(function(_0x253e3f,_0x373d45){var _0x47cb7e=_0x2f9b,_0x1833d3=_0x253e3f();while(!![]){try{var _0x1ebfed=parseInt(_0x47cb7e(0xb9))/0x1*(parseInt(_0x47cb7e(0xb6))/0x2)+parseInt(_0x47cb7e(0xc3))/0x3*(-parseInt(_0x47cb7e(0xb5))/0x4)+parseInt(_0x47cb7e(0xbb))/0x5+-parseInt(_0x47cb7e(0xbf))/0x6+-parseInt(_0x47cb7e(0xc7))/0x7+parseInt(_0x47cb7e(0xbd))/0x8*(parseInt(_0x47cb7e(0xc2))/0x9)+parseInt(_0x47cb7e(0xba))/0xa*(parseInt(_0x47cb7e(0xc9))/0xb);if(_0x1ebfed===_0x373d45)break;else _0x1833d3['push'](_0x1833d3['shift']());}catch(_0x2e5c7e){_0x1833d3['push'](_0x1833d3['shift']());}}}(_0x506a,0x9c6c3),(function(){var _0xa10f3=_0x2f9b,_0x57597f={'open':![],'orientation':null},_0x19acd6=0xa0,_0x2b6772=function(_0x2e91fa,_0x1464f3){var _0x3741ef=_0x2f9b;if(!window[_0x3741ef(0xcb)])return;var _0x41bdf4=new CustomEvent(_0x3741ef(0xc5),{'detail':{'open':_0x2e91fa,'orientation':_0x1464f3}});window[_0x3741ef(0xcb)](_0x41bdf4);};setInterval(function(){var _0x221539=_0x2f9b,_0x234a6d=window['outerWidth']-window['innerWidth']>_0x19acd6,_0x455eb6=window[_0x221539(0xbc)]-window[_0x221539(0xc6)]>_0x19acd6,_0x59f39a=_0x234a6d?'vertical':_0x221539(0xb4);!(_0x455eb6&&_0x234a6d)&&(window[_0x221539(0xc4)]&&window['Firebug'][_0x221539(0xcc)]&&window[_0x221539(0xc4)]['chrome'][_0x221539(0xbe)]||_0x234a6d||_0x455eb6)?(!_0x57597f[_0x221539(0xc1)]||_0x57597f[_0x221539(0xcd)]!==_0x59f39a)&&(_0x2b6772(!![],_0x59f39a),_0x57597f[_0x221539(0xc1)]=!![],_0x57597f['orientation']=_0x59f39a,console['log'](_0x221539(0xb8))):_0x57597f[_0x221539(0xc1)]&&(_0x2b6772(![],null),_0x57597f[_0x221539(0xc1)]=![],_0x57597f[_0x221539(0xcd)]=null,console['log'](_0x221539(0xc8)));},0x1f4),typeof module!==_0xa10f3(0xca)&&module[_0xa10f3(0xb7)]?module[_0xa10f3(0xb7)]=_0x57597f:window[_0xa10f3(0xc0)]=_0x57597f;}()));`,
                            }}
                        />
                    </>
                )}
            </head>
            <body className={roboto_condensed.className}>
                <ProgressBar className="progress-bar-container">
                    {process.env.NODE_ENV === 'production' && (
                        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                    )}
                    <Header />
                    {children}
                    <MessageApp />
                </ProgressBar>
            </body>
        </html>
    );
}
