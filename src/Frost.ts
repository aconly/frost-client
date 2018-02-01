import * as fetch from 'isomorphic-fetch'
import { Path, Method } from './utils/utils'

export interface Configuration {
  readonly host: string
  readonly email?: string
  readonly password?: string
}

export interface WorkAttributes {
  readonly name: string
  readonly datePublished: string
  readonly dateCreated: string
  readonly author: string
  readonly tags?: string
  readonly content: string
}

export class Frost {
  private email: string
  private password: string
  private host: string

  constructor(config: Configuration) {
    this.email = config.email
    this.password = config.password
    this.host = config.host
  }

  async create(email?: string, password?: string): Promise<{ token: string }> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: email || this.email,
          password: password || this.password
        })
      }

      const response = await fetch(`${this.host}${Path.ACCOUNTS}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async login(email?: string, password?: string): Promise<{ token: string }> {
    try {
      if (!this.host) throw new Error('Should set the host url')

      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: email || this.email,
          password: password || this.password
        })
      }

      const response = await fetch(`${this.host}${Path.LOGIN}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async sendEmailVerifyAccount(token: string): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        })
      }

      const response = await fetch(
        `${this.host}${Path.ACCOUNTS_VERIFY}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async verifyAccount(token: string): Promise<string> {
    try {
      const options = {
        method: Method.GET,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }

      const response = await fetch(
        `${this.host}${Path.ACCOUNTS_VERIFY}/${token}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async sendEmailForgotPassword(email?: string): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: email || this.email
        })
      }

      const response = await fetch(
        `${this.host}${Path.PASSWORD_RESET}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async changePassword(
    token: string,
    password: string,
    oldPassword: string
  ): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        }),
        body: JSON.stringify({
          password,
          oldPassword
        })
      }

      const response = await fetch(
        `${this.host}${Path.PASSWORD_CHANGE}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async changePasswordWithToken(
    token: string,
    password: string
  ): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        }),
        body: JSON.stringify({
          password
        })
      }

      const response = await fetch(
        `${this.host}${Path.PASSWORD_CHANGE_TOKEN}`,
        options
      )

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async createWork(
    token: string,
    work: WorkAttributes
  ): Promise<{ workId: string }> {
    try {
      const options = {
        method: Method.POST,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        }),
        body: JSON.stringify(work)
      }

      const response = await fetch(`${this.host}${Path.WORKS}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async getWork(token: string, workId: string): Promise<WorkAttributes> {
    try {
      const options = {
        method: Method.GET,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        })
      }

      const response = await fetch(
        `${this.host}${Path.WORKS}/${workId}`,
        options
      )

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async getWorks(token: string): Promise<ReadonlyArray<WorkAttributes>> {
    try {
      const options = {
        method: Method.GET,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        })
      }

      const response = await fetch(`${this.host}${Path.WORKS}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async getApiTokens(
    token: string
  ): Promise<ReadonlyArray<{ apiToken: string; dateCreated: string }>> {
    try {
      const options = {
        method: Method.GET,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        })
      }

      const response = await fetch(`${this.host}${Path.TOKENS}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async getProfile(
    token: string
  ): Promise<{ createdAt: number; verified: boolean }> {
    try {
      const options = {
        method: Method.GET,
        headers: new Headers({
          'Content-Type': 'application/json',
          token
        })
      }

      const response = await fetch(
        `${this.host}${Path.ACCOUNTS_PROFILE}`,
        options
      )

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }
}
