import fs from "fs"
import * as git from "isomorphic-git"
import rimraf from "rimraf"
import uuid from "uuid"

const repos: string[] = []

afterAll(() => {
  repos.map(repo => {
    rimraf.sync(repo)
    console.info("removed", repo)
  })
})

export async function createTempGitProject() {
  const tempRoot = "/tmp/__tempRoot__" + uuid()
  repos.push(tempRoot)

  fs.promises.mkdir(tempRoot)
  await git.init({ fs, dir: tempRoot })
  console.info("created", tempRoot)

  return tempRoot
}
