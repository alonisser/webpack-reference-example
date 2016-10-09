# This file provided by Facebook is for non-commercial testing and evaluation
# purposes only. Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import json
import os
import time
from flask import Flask, Response, request
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_url_path='', static_folder='public')
CORS(app)
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

@app.route('/api/comments/<int:comment_id>/like', methods=['POST', 'DELETE'])
def comment_like_handler(comment_id):
    with open('comments.json', 'r') as f:
        comments = json.loads(f.read())
        mapped_comments = {int(comment['id']): comment for comment in comments}
    comment = mapped_comments[comment_id]
    if request.method == 'POST':

        comment['isLiked'] = True

    if request.method == 'DELETE':

            comment['isLiked'] = False

    mapped_comments[comment_id] = comment
    comments =  mapped_comments.values()
    with open('comments.json', 'w') as f:
        f.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(
            json.dumps(comments),
            mimetype='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        )


@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():
    with open('comments.json', 'r') as f:
        comments = json.loads(f.read())

    if request.method == 'POST':
        new_comment = request.form.to_dict()
        new_comment['id'] = int(time.time() * 1000)
        comments.append(new_comment)

        with open('comments.json', 'w') as f:
            f.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(
        json.dumps(comments),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )


if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)))
