# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from locust import HttpLocust, TaskSet, task, between

#bundle all tests to be done in UserBehavior
class UserBehavior(TaskSet):

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        #self.login()
        #No login handler on this website...
        print("on_start initialised")

    def login(self):
        self.client.post("/login", {"username":"ellen_key", "password":"education"})

    #@task is a task declaration.
    @task(1)
    def mainPage(self):
        self.client.get("/")

    @task(2)
    def suggestBooks(self):
        self.client.get("/SuggestBooks")

    @task(3)
    def explore(self):
        self.client.get("/Explore")

    @task(4)
    def advancedSearch(self):
        self.client.get("/AdvancedSearch")

    @task(5)
    def borrowings(self):
        self.client.get("/Borrowings")

    @task(6)
    def cart(self):
        self.client.get("/Cart")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    
    #Sets the wait time limits in 1000s of miliseconds before a task is ended. Note min_wait and max_wait are deprecated
    wait_time = between(4, 9) 
    