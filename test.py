

# data = open("data.txt","r").readlines()
# line = ""

# for i in data :
#     line += "<li>\n" +  "        <input type=\"checkbox\" value=\"" + i.rstrip() + "\"><label> </label>\n" + "    </li>\n"

# out = open("out.txt","w")

# out.writelines(line)
# out.close()

# data = open("out.txt",'r').readlines()
# res = {}

# for i in data:
#     x,y = i.rstrip().split("=")
#     res[x] = y

data = open('data.txt','r').readlines()

res =""

for i in data:
    res += i.rstrip()

out = open('out.txt','w')
out.writelines(res)
out.close()