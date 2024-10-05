import csv
import json

# tags.json : tags.json in dabnbooru2023/metadata/tags.tar.xz
# https://huggingface.co/datasets/nyanko7/danbooru2023/tree/main/metadata
data = []
with open("tags.json", "r", encoding="utf-8") as f_in:
    for s in f_in.readlines():
        row = json.loads(s)
        if row["post_count"] > 0:
            data.append([row["name"], int(row["post_count"])])

data.sort(key=lambda x: x[1], reverse=True)

with open("tags.csv", "w", newline="") as f_out:
    writer = csv.writer(f_out)
    writer.writerows([["name", "count"]] + data)
