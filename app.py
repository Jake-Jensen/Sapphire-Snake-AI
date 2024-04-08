import logging
from flask import Flask, render_template
app = Flask(__name__)

# Make the WSGI interface available at the top level so wfastcgi can get it.
wsgi_app = app.wsgi_app


@app.route('/')
def Webpage():
    # Render a simple webpage
    return render_template('Webpage.html')

if __name__ == '__main__':
    import os
    HOST = '0.0.0.0'
    try:
        PORT = int(1662)
    except ValueError:
        PORT = 1662
        
    logging.basicConfig(level=logging.DEBUG) # Temporary logging
    logging.debug(f"HOST: {HOST}")
    logging.debug(f"PORT: {PORT}")
    app.run(HOST, PORT)
