import re, os

filepath = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'syntheticPatients.ts')
extra_path = os.path.join(os.path.dirname(__file__), 'extra_patients.ts')

with open(filepath, 'r') as f:
    content = f.read()

# Remove stray comment if present
if '// Additional 15 patients appended below' in content:
    content = content[:content.rfind('// Additional 15 patients appended below')].rstrip()

with open(extra_path, 'r') as f:
    extra = f.read().strip()

insert_before = '\n];\n\nexport default syntheticPatients;'
insert_pos = content.rfind(insert_before)

if insert_pos == -1:
    print("ERROR: insertion point not found")
    exit(1)

new_content = content[:insert_pos] + ',\n\n' + extra + insert_before
with open(filepath, 'w') as f:
    f.write(new_content)

print(f"Done. Inserted {extra.count('id: ')} patients.")
