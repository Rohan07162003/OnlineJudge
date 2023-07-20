const stubs = {};
stubs.cpp = `#include <iostream>
using namespace std;
int main(){
    cout<<"Hello world!\\n";
    return 0;
}
`;
stubs.c = `#include <stdio.h>
using namespace std;
int main(){
    printf("Hello world!");
    return 0;
}
`;
stubs.py = `print("Hello World!")`;
export default stubs;